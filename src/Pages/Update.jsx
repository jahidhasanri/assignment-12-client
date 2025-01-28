import React, { useContext, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { AuthContext } from '../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imageupload } from '../utils'; // Utility function for image upload

const Update = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const auth = getAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const img = e.target.img.files[0];

    try {
      // Upload image
      const image = await imageupload(img);

      // Update Firebase user profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });

      // Update local user context
      setUser({
        ...user,
        displayName: name,
        photoURL: image,
      });

      // Show success notification
      toast.success('Profile updated successfully');
    } catch (error) {
      // Handle errors and show an error notification
      toast.error('Error updating profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="mt-20">
      <ToastContainer />
      <div className="card bg-base-100 w-full mt-5 max-w-sm shrink-0 shadow-2xl mx-auto">
        <form onSubmit={handleUpdate} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered text-black"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Image</span>
            </label>
            <input
              type="file"
              name="img"
              className="file-input file-input-bordered text-black"
              required
            />
          </div>

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
