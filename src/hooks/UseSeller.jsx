import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';

const UseSeller = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure= UseAxiosSecure();
 const {data: isseller, isPending: issellerLoading} = useQuery({
    queryKey: [user?.email, 'isseller'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/users/seller/${user.email}`);
      
        return res.data.seller;
    }
 })
 return [isseller,issellerLoading]
};

export default UseSeller;