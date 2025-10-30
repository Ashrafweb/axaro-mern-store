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
    <div className="min-h-screen">
      <section className='px-4 sm:px-6 lg:px-8 py-4 md:py-8 lg:pl-[10rem] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12'>
        <div className='w-full max-w-md lg:max-w-lg'>
          <h1 className='text-2xl md:text-3xl font-bold mb-6'>Sign In</h1>

          <form onSubmit={submitHandler} className='space-y-5'>
            <div>
              <label
                htmlFor='email'
                className='label-text'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                className='input-field'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='label-text'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='input-field'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type='submit'
              className='btn-primary w-full flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className='mt-6 text-center lg:text-left'>
            <p className='font-medium'>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className='text-primary hover:text-primary-dark hover:underline transition-colors'
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className='w-full max-w-md lg:max-w-xl text-center px-4'>
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4'>
            Welcome To <span className='text-primary'>Axaro</span>
          </h1>
          <p className='text-base md:text-lg lg:text-xl text-dark-text-secondary dark:text-dark-text-secondary'>
            Shop a curated selection of smartphones, laptops, and more from top
            brands.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
