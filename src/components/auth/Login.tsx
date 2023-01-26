import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi, signUpApi } from '../../api/auth.service';
import { UserContext } from '../../context/userContext';

const Login = ({ show, setShow }: any) => {
   const navigate = useNavigate()

   const { isUserLogin, setIsUserLogin, setAddresses, user, setUser } = useContext(UserContext);

   const [showSignUp, setShowSignUp] = useState(false);

   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => {
      setShow(true);
   };

   const [email, setEmail] = useState('nima@gmail.com');
   const [name, setName] = useState('نیماا');
   const [phone, setPhone] = useState('09213727668');
   const [password, setPassword] = useState('1234');
   const [rePassword, setRePassword] = useState('1234');

   const logInClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      loginApi(
         {
            email,
            password,
         },
         (isOk, result) => {
            if (isOk) {
               setShow(false)
               toast.success('ورود موفقیت آمیز بود');
               localStorage.setItem("AuthToken", result.token)
               // setContext
               setIsUserLogin(true)
               console.log(result.user);
               setUser(result.user)
               setAddresses(result.user.addresses)

               navigate('/user/home')
            } else {
               toast.error(result.response.data.message);
            }
         },
      );
   };

   const signUpClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      if(password != rePassword){
         return toast.warn("رمز و تکرار آن باید یکی باشند")
      }
      signUpApi({email, name,phone, password}, (isOk, result) => {
         if (isOk) {
            toast.success('ثبت نام موفقت آمیز بود');
            setShowSignUp(false)
            setShow(true)
         } else {
            toast.error(result.response.data.message);
         }
      })
   };

   return (
      <>
         {/* Login Modal */}
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>ورود</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form>
                  <div className="mb-3">
                     <label className="form-label">آدرس ایمیل</label>
                     <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={e => {
                           setEmail(e.target.value);
                        }}
                     />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">رمز عبور</label>
                     <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={e => {
                           setPassword(e.target.value);
                        }}
                     />
                  </div>
                  <button
                     type="submit"
                     className="btn btn-primary w-100"
                     onClick={e => {
                        logInClick(e);
                     }}
                  >
                     ورود
                  </button>
                  <div className="my-3">
                     <Link
                        to={''}
                        onClick={() => {
                           setShow(false);
                           setShowSignUp(true);
                        }}
                     >
                        در صورتی که اکانت ندارید برای ثبت نام کلیک کنید
                     </Link>
                  </div>
               </form>
            </Modal.Body>
         </Modal>

         {/* sign up Modal */}
         <Modal
            show={showSignUp}
            onHide={() => {
               setShowSignUp(false);
            }}
         >
            <Modal.Header closeButton>
               <Modal.Title>ثبت نام</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form>
                  <div className="mb-3">
                     <label className="form-label">آدرس ایمیل</label>
                     <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={e => {
                           setEmail(e.target.value);
                        }}
                     />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">نام</label>
                     <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={e => {
                           setName(e.target.value);
                        }}
                     />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">شماره تماس</label>
                     <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={phone}
                        onChange={e => {
                           setPhone(e.target.value);
                        }}
                     />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">رمز عبور</label>
                     <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={e => {
                           setPassword(e.target.value);
                        }}
                     />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">تکرار رمز عبور</label>
                     <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={rePassword}
                        onChange={e => {
                           setRePassword(e.target.value);
                        }}
                     />
                  </div>
                  <button
                     type="submit"
                     className="btn btn-primary w-100"
                     onClick={e => {
                        signUpClick(e);
                     }}
                  >
                     ثبت نام
                  </button>
               </form>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default Login;
