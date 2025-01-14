import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import { HiMiniEyeSlash } from 'react-icons/hi2';
import { IoEyeSharp } from 'react-icons/io5';
import Lottie from 'react-lottie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import animationData from '../../src/assets/lotti/Animation - 1735212867927.json';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.files[0];
    const password = e.target.password.value;

    // Validate email and password
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.'
      );
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

      // Update profile with name and photo URL
      await updateProfile(result.user, {
        displayName: name,
        photoURL,
      });

      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
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
    <div>
      <Helmet>
        <title>MediCart | Register</title>
      </Helmet>
      <div className=" md:hero bg-base-200 ">
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
                <button className="btn btn-primary">Register</button>
              </div>
              <p className="text-black">
                Have an account?{' '}
                <Link to="/login" className="text-red-500 border-b-2">
                  Login
                </Link>
              </p>
            </form>
            <div className="form-control mt-4 w-8/12 mx-auto mb-10">
              <button className="btn btn-outline btn-secondary">
                <FcGoogle />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
