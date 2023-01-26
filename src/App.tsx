import Header from './components/header/Header';
import Welcome from './pages/welcome/Welcome';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Router } from 'react-router-dom';
import Home from './pages/home/Home';
import { UserContext } from './context/userContext';
import { useEffect, useState } from 'react';
import Restaurant from './pages/home/Restaurant';
import EditUser from './components/auth/EditUser';
import { getUserApi } from './api/auth.service';
import Orders from './components/order/Oreders';

function App() {

   const [isUserLogin, setIsUserLogin] = useState(false);
   const [addresses, setAddresses] = useState([]);
   const [address, setAddress] = useState('');
   const [order, setOrder] = useState({
      foods: [],
      address: '',
      phoneToContact: '',
      restaurantName: '',
      restaurantId: '',
   });
   const [addressIndex, setAddressIndex] = useState(-1)
   const [user, setUser] = useState({name: '', email: '', phone: ''});

   useEffect(() => {
      if(localStorage.getItem('AuthToken')){
         getUserApi((isOk: boolean, result: any) => {
            if (isOk) {
               setUser({
                  name: result.user.name,
                  phone: result.user.phone,
                  email: result.user.email,
               });
               setAddresses([...result.user.addresses]);
               setIsUserLogin(true)
            }
         });
      }
   }, [])

   return (
      <>
         <UserContext.Provider
            value={{
               isUserLogin,
               setIsUserLogin,
               addresses,
               setAddresses,
               user,
               setUser,
               addressIndex,
               setAddressIndex,
               order,
               setOrder,
               address,
               setAddress,
            }}
         >
            <Routes>
               <Route path="/" element={<Welcome />} />
               <Route path="/user/home" element={<Home />} />
               <Route path="/user/edit" element={<EditUser />} />
               <Route path="/user/restaurant/:restaurantId" element={<Restaurant />} />
               <Route path="/user/order" element={<Orders />} />
            </Routes>
            <ToastContainer />
         </UserContext.Provider>
      </>
   );
}

export default App;
