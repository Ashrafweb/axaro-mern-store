import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Account = () => {
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading: loadingUpdateProfile }] =
		useProfileMutation();

	useEffect(() => {
		setUserName(userInfo.username);
		setEmail(userInfo.email);
	}, [userInfo.email, userInfo.username]);

	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					username,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile updated successfully");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<div className='container mx-auto px-4 py-4 md:py-7'>
			<div className='flex justify-center items-start'>
				<div className='w-full max-w-2xl'>
					<h2 className='text-2xl md:text-3xl font-bold mb-6'>
						Update Profile
					</h2>
					<form onSubmit={submitHandler} className='space-y-5'>
						<div>
							<label className='label-text'>Name</label>
							<input
								type='text'
								placeholder='Enter name'
								className='input-field'
								value={username}
								onChange={(e) => setUserName(e.target.value)}
								required
							/>
						</div>

						<div>
							<label className='label-text'>Email Address</label>
							<input
								type='email'
								placeholder='Enter email'
								className='input-field'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div>
							<label className='label-text'>Password</label>
							<input
								type='password'
								placeholder='Enter password (leave blank to keep current)'
								className='input-field'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div>
							<label className='label-text'>Confirm Password</label>
							<input
								type='password'
								placeholder='Confirm password'
								className='input-field'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						<div className='flex justify-start'>
							<button
								type='submit'
								disabled={loadingUpdateProfile}
								className='btn-primary flex items-center justify-center gap-2'
							>
								{loadingUpdateProfile ? (
									<>
										<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
										<span>Updating...</span>
									</>
								) : (
									"Update Profile"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Account;
