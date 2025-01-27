import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';

const UseCard = () => {
    const { user } = useContext(AuthContext);
// Check if user is properly set
  
    const { refetch, data: card = [], isLoading, isError, error } = useQuery({
      queryKey: ['card', user?.email],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/cards?email=${user.email}`);
        return res.data;
      },
      enabled: !!user?.email,
    });
  
    if (isLoading) {
      return [card, isLoading];
    }
  
    if (isError) {
      console.error('Error fetching card data:', error);
      return [card, isError, error];
    }
    refetch();
  
    return [card, refetch];
  };
  

export default UseCard;
