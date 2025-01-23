import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className='pl-[10rem] flex flex-wrap md:flex-nowrap flex-row-reverse '>
      <div className='max-w-[400px] sm:max-w-[600px] mx-auto text-center px-2 md:px-4  mt-2 md:mt-[100px]'>
        <h1 className='text-xl md:text-5xl font-bold py-2 md:py-4'>
          Welcome To <span className='text-orange-500'>Axaro</span>
        </h1>
        <p className='text-balance text-md sm:text-xl font-semibold'>
          Shop a curated selection of smartphones, laptops, and more from top
          brands.
        </p>
      </div>
      <div className='mr-[4rem] mt-[5rem]'>
        <h1 className='text-2xl font-semibold mb-4'>Register</h1>

        <form onSubmit={submitHandler} className='container w-[40rem]'>
          <div className='my-[2rem]'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-white'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter name'
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className='my-[2rem]'>
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

          <div className='my-[2rem]'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-white'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type='submit'
            className='bg-orange-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className='mt-4'>
          <p className='text-white'>
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className='text-orange-500 hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
