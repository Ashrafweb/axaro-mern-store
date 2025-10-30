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
    <section className='min-h-screen px-4 sm:px-6 lg:px-8 py-4 md:py-8 lg:pl-[10rem] flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-8 lg:gap-12'>
      <div className='w-full max-w-md lg:max-w-xl text-center px-4'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4'>
          Welcome To <span className='text-primary'>Axaro</span>
        </h1>
        <p className='text-base md:text-lg lg:text-xl text-dark-text-secondary dark:text-dark-text-secondary font-medium'>
          Shop a curated selection of smartphones, laptops, and more from top
          brands.
        </p>
      </div>
      <div className='w-full max-w-md lg:max-w-lg'>
        <h1 className='text-2xl md:text-3xl font-bold mb-6'>Register</h1>

        <form onSubmit={submitHandler} className='space-y-5'>
          <div>
            <label
              htmlFor='name'
              className='label-text'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='input-field'
              placeholder='Enter name'
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label
              htmlFor='confirmPassword'
              className='label-text'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='input-field'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className='mt-6 text-center lg:text-left'>
          <p className='font-medium'>
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className='text-primary hover:text-primary-dark hover:underline transition-colors'
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
