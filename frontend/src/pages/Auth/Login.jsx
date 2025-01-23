import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className='px-4 sm:px-4 py-2 sm:py-4 md:py-8 h-screen md:pl-[10rem] flex flex-wrap md:flex-nowrap  '>
        <div className='mt-4 md:mt-[5rem]'>
          <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

          <form onSubmit={submitHandler} className='container w-[40rem]'>
            <div className='my-[2rem]'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-white'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                className='mt-1 p-2 border rounded w-full'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-white'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='mt-1 p-2 border rounded w-full'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type='submit'
              className='bg-orange-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className='mt-4 text-start'>
            <p className='font-semibold'>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className='text-orange-500 hover:underline'
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className='max-w-[400px] sm:max-w-[600px] mx-auto text-center px-2 md:px-4  mt-2 md:mt-[100px]'>
          <h1 className='text-xl md:text-5xl font-bold py-2 md:py-4'>
            Welcome To <span className='text-orange-500'>Axaro</span>
          </h1>
          <p className='text-balance text-md sm:text-lg'>
            Shop a curated selection of smartphones, laptops, and more from top
            brands.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
