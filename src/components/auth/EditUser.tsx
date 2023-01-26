import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserApi, getUserApi } from '../../api/auth.service';
import Address from '../address/Address';
import Header from '../header/Header';

const EditUser = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({ name: '', phone: '', email: '' });
   const [addresses, setAddresses] = useState<string[]>([]);
   const [newAddress, setNewAddress] = useState('');

   const deleteAddress = (index: number) => {
      let arr = [...addresses];
      arr.splice(index, 1);
      setAddresses(arr);
   };

   useEffect(() => {
      getUserApi((isOk: boolean, result: any) => {
         if (isOk) {
            setUser({
               name: result.user.name,
               phone: result.user.phone,
               email: result.user.email,
            });
            setAddresses(result.user.addresses);
         }
      });
   }, []);

   const editUserClick = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (
         user.name == '' ||
         user.email == '' ||
         user.phone == '' 
      ) {
         toast.warn('لطفا فیلد ها رو به درستی پر کنید');
         return;
      }

      const id = toast.loading('Editing User...');

      editUserApi({...user, addresses}, (isOk: boolean, result: any) => {
         if (isOk) {
            toast.update(id, {
               render: 'ویرایش با موفقت انجام شد',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
            navigate('/user/home')
         } else {
            console.log(result.message);
            toast.update(id, {
               render: result.response.data.message,
               type: 'error',
               isLoading: false,
               autoClose: 2000,
            });
         }
      });


   };

   return (
      <>
         <Header />
         <div className="container py-4">
            <form
               className="pt-3 col-sm-8 col-md-6 col-lg-4"
               onSubmit={event => {
                  editUserClick(event);
               }}
            >
               <div className="mb-3">
                  <label className="form-label">نام</label>
                  <input
                     type="text"
                     className="form-control"
                     onChange={e => {
                        setUser({ ...user, name: e.target.value });
                     }}
                     value={user.name}
                  />
               </div>
               <div className="mb-3">
                  <label className="form-label">ایمیل</label>
                  <input
                     type="text"
                     className="form-control"
                     onChange={e => {
                        setUser({ ...user, email: e.target.value });
                     }}
                     value={user.email}
                  />
               </div>
               <div className="mb-3">
                  <label className="form-label">شماره تماس</label>
                  <input
                     type="text"
                     className="form-control"
                     onChange={e => {
                        setUser({ ...user, phone: e.target.value });
                     }}
                     value={user.phone}
                  />
               </div>
               <div className="mb-3">
                  <label className="form-label">آدرس ها</label>
                  <div className="mb-1">
                     {addresses.map((item, index) => {
                        return (
                           <Address
                              key={index}
                              address={item}
                              index={index}
                              setAddresses={setAddresses}
                              deleteAddress={deleteAddress}
                           />
                        );
                     })}
                  </div>
                  <textarea
                     className="form-control mb-2"
                     onChange={e => {
                        setNewAddress(e.target.value);
                     }}
                     value={newAddress}
                     rows={2}
                  ></textarea>
                  <Button
                     variant="primary"
                     onClick={e => {
                        let arr = [...addresses];
                        arr.push(newAddress);
                        setAddresses(arr);
                        setNewAddress('');
                     }}
                  >
                     افزودن آدرس <i className="bi bi-plus-circle-fill"></i>
                  </Button>
               </div>
               <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 add-btn mb-3"
               >
                  ویرایش
               </button>
            </form>
         </div>
      </>
   );
};

export default EditUser;
