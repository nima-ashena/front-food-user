import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Login from '../auth/Login';
import Addresses from '../address/Addresses';
import Order from '../order/order';

const Header = () => {
   const { isUserLogin, setIsUserLogin, user, addressIndex, addresses } =
      useContext(UserContext);

   const [show, setShow] = useState(false);
   const [showAddresses, setShowAddresses] = useState(false);
   const [showBasket, setShowBasket] = useState(false);

   useEffect(() => {
      // setIsUserLogin(true);
   }, []);

   const exitClick = () => {
      localStorage.removeItem('AuthToken');
      setIsUserLogin(false);
   };

   return (
      <>
         <nav
            className="navbar navbar-expand-lg"
            style={{ background: '#afb0b3' }}
         >
            <div className="container-fluid py-2 px-sm-4">
               <a
                  className="navbar-brand text-light"
                  href="#"
                  style={{ fontSize: 30, fontWeight: 600 }}
               >
                  !FOODS
               </a>
               <button
                  className="navbar-toggler btn-light bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon">
                     <i className="bi bi-list"></i>
                  </span>
               </button>
               {/* Menu */}
               <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
               >
                  {isUserLogin ? (
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {addressIndex == -1 ? (
                           <button
                              type="button"
                              className="btn btn-danger dropdown-toggle mx-sm-3"
                              onClick={e => {
                                 setShowAddresses(true);
                              }}
                              style={{ maxWidth: 400, overflow: 'hidden' }}
                           >
                              آدرس خود را انتخاب کنید
                           </button>
                        ) : (
                           <button
                              type="button"
                              className="btn btn-danger dropdown-toggle mx-sm-3"
                              onClick={e => {
                                 setShowAddresses(true);
                              }}
                              style={{ maxWidth: 400, overflow: 'hidden' }}
                           >
                              {addresses[addressIndex]}
                           </button>
                        )}
                        <li className="nav-item dropdown">
                           <a
                              className="nav-link dropdown-toggle text-light"
                              style={{ fontSize: 25 }}
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                           >
                              <i className="bi bi-person"></i>
                           </a>
                           <ul className="dropdown-menu">
                              <li>
                                 <p className="px-3">{user.name}</p>
                              </li>
                              <li>
                                 <hr className="dropdown-divider" />
                              </li>
                              <li>
                                 <Link
                                    className="dropdown-item"
                                    to={'/user/home'}
                                 >
                                    صفحه اصلی
                                 </Link>
                              </li>
                              <li>
                                 <Link
                                    className="dropdown-item"
                                    to={'/user/order'}
                                 >
                                    لیست سفارشات
                                 </Link>
                              </li>
                              <li>
                                 <Link
                                    className="dropdown-item"
                                    to={'/user/edit'}
                                 >
                                    ویرایش محاطب
                                 </Link>
                              </li>
                              <li>
                                 <Link
                                    className="dropdown-item"
                                    to={''}
                                    onClick={exitClick}
                                 >
                                    خروج
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li className="nav-item dropdown">
                           <a
                              className="nav-link text-light"
                              style={{ fontSize: 25 }}
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                           >
                              <i
                                 className="bi bi-cart"
                                 onClick={e => {
                                    setShowBasket(true);
                                 }}
                              ></i>
                           </a>
                        </li>
                     </ul>
                  ) : (
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <button
                           className="btn btn-primary px-4"
                           style={{ fontSize: 20, fontWeight: 500 }}
                           onClick={() => {
                              setShow(true);
                           }}
                        >
                           ورود
                        </button>
                     </ul>
                  )}

                  <form className="d-flex" role="search">
                     <input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="جستجو ..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                     />
                     <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                           <i className="bi bi-search"></i>
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </nav>
         <Login show={show} setShow={setShow} />
         <Addresses show={showAddresses} setShow={setShowAddresses} />
         <Order show={showBasket} setShow={setShowBasket} />
      </>
   );
};

export default Header;
