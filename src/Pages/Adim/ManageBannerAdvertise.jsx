import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const ManageBannerAdvertise = () => {
  
  const { data: medicines = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['manageMedicine'],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/advertisements`);
        return response.data;
      } catch (error) {
        toast.error('Failed to fetch medicines');
        throw error;
      }
    },
  });

  // Handle the toggle for adding/removing advertisement from the homepage slider
  const toggleAdvertisement = async (advertisementId, currentStatus) => {
    try {
      const updatedStatus = currentStatus ? 'inactive' : 'active'; // Toggle status
      const response = await axios.patch(`http://localhost:5000/advertisements/${advertisementId}`, {
        status: updatedStatus,
      });

      if (response.data.modifiedCount > 0) {
        toast.success('Advertisement updated successfully!');
        refetch();  // Refetch updated data
      } else {
        toast.warn('No changes made to advertisement');
      }
    } catch (error) {
      toast.error("Failed to update advertisement status");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Banner Advertise</h2>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      {isLoading && <p>Loading advertisements...</p>}
      {isError && <p className="text-red-500">Failed to load advertisements</p>}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Medicine Image</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(ad => (
              <tr key={ad._id}>
                <td>{ad.medicineName}</td>
                <td>
                  <img className="w-16 h-16 rounded" src={ad.imgaurl} alt={ad.medicineName} />
                </td>
                <td>{ad.description}</td>
                <td>{ad.sellerEmail}</td>
                <td>
                  <span className={ad.status === 'active' ? 'text-green-500' : ad.status === 'requested' ?'text-yellow-400' : 'text-red-500'}>
                    {ad.status}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn ${ad.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => toggleAdvertisement(ad._id, ad.status === 'active')}
                  >
                    {ad.status === 'active' ? 'Remove from Slider' : 'Add to Slider'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBannerAdvertise;
