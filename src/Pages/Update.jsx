import React, { useContext, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(null);
  const auth = getAuth();

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error('User is not logged in!');
      return;
    }

    // Photo URL fallback
    let photoUrl = user?.photoURL;

    // If photo is uploaded, process it
    if (photo) {
      // Simulate photo upload - for real-world, use Firebase Storage or IMGBB
      const reader = new FileReader();
      reader.onload = async () => {
        photoUrl = reader.result;
        await updateProfileInfo(name, photoUrl);
      };
      reader.readAsDataURL(photo);
    } else {
      // Only update name if no photo uploaded
      await updateProfileInfo(name, photoUrl);
    }
  };

  // Function to update profile in Firebase
  const updateProfileInfo = async (name, photoUrl) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });
      console.log(name,photoUrl);
      // Update the context state
      setUser({ ...auth.currentUser, displayName: name, photoURL: photoUrl });
      toast.success('Profile updated successfully!');
    } 
    catch (error) {
      toast.error('Profile update failed. Please try again.');
      
    }
  };

  return (
    <div className="mt-20">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
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
