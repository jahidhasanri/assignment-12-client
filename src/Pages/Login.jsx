import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from 'react-helmet';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import animationLogin from '../../src/assets/lotti/Animation - 1735216092780';

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLogin,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleGoogleLogin = () => {
    // Add your Google login logic here
    console.log('Google login initiated');
  };

  return (
    <div>
      <Helmet>
        <title>MediCart | Login</title>
      </Helmet>
      <div className="hero bg-base-200  mt-[100px] md:mt-[5px]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* Lottie Animation */}
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <Lottie options={defaultOptions} className="max-w-sm mx-auto lg:mx-0" />
          </div>
          
          {/* Login Form */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center mt-4">Login now!</h1>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link to="/forgetpassword" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-500 border-b-2">
                  Register
                </Link>
              </p>
            </form>
            
            {/* Google Login */}
            <div className="form-control mt-4 w-8/12 mx-auto mb-10">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-secondary flex items-center justify-center space-x-2"
              >
                <FcGoogle /> <span>Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
