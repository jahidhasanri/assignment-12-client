import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UseSeller from '../hooks/UseSeller';

const SellerRoute = ({children}) => {
    const [isseller,issellerLoading]=UseSeller();
    const {user,loader}=useContext(AuthContext)
   const navigate = useNavigate()
    if(loader || issellerLoading){
        return <progress className='progress w-56'></progress>
    }
    if(user && isseller){
        return children;
    }
   return navigate('/login')
    
};

export default SellerRoute;