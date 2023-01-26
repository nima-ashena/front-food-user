import { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserApi, loginApi, signUpApi } from '../../api/auth.service';
import { UserContext } from '../../context/userContext';

const Addresses = ({ show, setShow }: any) => {
   const navigate = useNavigate();
   const { addressIndex, setAddressIndex, setAddress } = useContext(UserContext);
   const [addressLocalIndex, setAddressLocalIndex] = useState(-1);
   const [addresses, setAddresses] = useState<string[]>([]);

   useEffect(() => {}, [addressLocalIndex]);

   useEffect(() => {
      getUserApi((isOk: boolean, result: any) => {
         if (isOk) {
            setAddresses(result.user.addresses);
         }
      });
   }, []);

   const handleClose = () => {
      setShow(false);
   };

   return (
      <>
         {/* Login Modal */}
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>آدرس خود را انتخاب کنید</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {addresses.length == 0 ? (
                  <div className="alert alert-warning" role="alert">
                     شماره آدرس ثبت شده ای ندارید، لطفا اقدام به ثبت آن کنید
                  </div>
               ) : (
                  <Form>
                     {addresses.map((item, index) => {
                        return (
                           <div className="mb-3">
                              <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    // checked={}
                                    onChange={e => {
                                       if (e.target.checked) {
                                          setAddressLocalIndex(index);
                                          setAddressIndex(index)
                                          setAddress(addresses[index])
                                       }
                                       setShow(false)
                                    }}
                                 />
                                 <label className="form-check-label">
                                    {item}
                                 </label>
                              </div>
                           </div>
                        );
                     })}
                  </Form>
               )}
            </Modal.Body>
         </Modal>
      </>
   );
};

export default Addresses;
