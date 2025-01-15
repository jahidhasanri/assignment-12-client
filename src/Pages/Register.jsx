import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import { HiMiniEyeSlash } from 'react-icons/hi2';
import { IoEyeSharp } from 'react-icons/io5';
import Lottie from 'react-lottie';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import axios from 'axios';
import animationData from '../../src/assets/lotti/Animation - 1735212867927.json';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { handelRegistWemail, handelLoginWithGoogle, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.files[0];
    const password = e.target.password.value;
    const role = e.target.role.value;

    if (!emailRegex.test(email)) {
      toast.error('Invalid email address.');
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 6 characters and include both uppercase and lowercase letters.'
      );
      setLoading(false);
      return;
    }

    if (!photo) {
      toast.error('Please upload a valid photo.');
      setLoading(false);
      return;
    }

    try {
      // Upload photo to IMGBB
      const formData = new FormData();
      formData.append('image', photo);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      const photoURL = data.data.display_url;

      // Register user with email and password
      const result = await handelRegistWemail(email, password);

      // Update user profile with name and photo URL
      await updateProfile(result.user, { displayName: name, photoURL });

      // Save user data to the backend
      const userData = { name, email, photoURL, role };
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData);

      toast.success('Registration successful!');
      setUser(result.user); // Set user data in context
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error(`Error: ${error.message || 'Registration failed.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    handelLoginWithGoogle()
      .then((result) => {
        toast.success('Login with Google successful!');
        setUser(result.user); // Set user data from Google login
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Google login failed: ${error.message}`);
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="mt-20">
      <Helmet>
        <title>MediCart | Register</title>
      </Helmet>
      <div className="md:hero bg-base-200">
        <div className="hero-content flex-col gap-32 lg:flex-row-reverse">
          <div className="text-center mt-[180px] md:mt-6 lg:text-left">
            <Lottie options={defaultOptions} />
          </div>
          <div className="card bg-base-100 w-full mt-3 max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center text-black">Register now!</h1>
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered text-black"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered text-black"
                  required
                />
              </div>
              <div className="form-control text-black">
                <label className="label">
                  <span className="label-text text-black">Photo</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Role</span>
                </label>
                <select
                  name="role"
                  className="select select-bordered text-black"
                  defaultValue="user"
                  required
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50px] right-3 text-xl text-black"
                >
                  {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                </button>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
              <p className="text-black">
                Have an account?{' '}
                <Link to="/login" className="text-red-500 border-b-2">
                  Login
                </Link>
              </p>
            </form>
            <div className="form-control mt-4 w-8/12 mx-auto mb-10">
              <button className="btn btn-outline btn-secondary" onClick={handleGoogleLogin}>
                <FcGoogle />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
