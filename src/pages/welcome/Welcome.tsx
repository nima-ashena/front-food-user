import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurantsQApi } from '../../api/user.service';
import foodsJpg from '../../assets/img/bg/foods.jpg';
import Login from '../../components/auth/Login';

const Welcome = () => {

   const [show, setShow] = useState(false);
   const [q, setQ] = useState('')
   const navigate = useNavigate()

   const searchClick = () => {
      navigate(`/user/home/${q}`)
      
   }

   return (
      <div
         className="p-4"
         style={{
            backgroundImage: `url(${foodsJpg})`,
            height: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div className="d-flex align-items-center justify-content-between px-3 py-1">
            <h2 className="logo m-0" style={{ fontSize: 50 }}>
               !FOODS
            </h2>
            <button className="btn btn-lg btn-success px-5" onClick={() => {setShow(true)}}>ورود</button>
         </div>

         <div className="py-5 px-3 m-3 d-flex flex-column align-items-center justify-content-center" style={{height: "80%"}}>
            <h2 className="mb-5" style={{ color: '#fff', fontSize: 40, fontWeight: 600 }}>
               سفارش آنلاین غذا
            </h2>
            <form className="d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search">
               <div className="input-group">
                  <input
                     type="text"
                     className="form-control bg-light border-0 mb-3"
                     placeholder="جستجو ..."
                     aria-label="Search"
                     aria-describedby="basic-addon2"
                     style={{fontSize: 30}}
                     value={q}
                     onChange={(e) => {setQ(e.target.value)}}
                  />
                  <div className="input-group-append">
                     <button className="btn btn-success" style={{fontSize: 30}} type="button" onClick={searchClick}>
                        <i className="bi bi-search"></i>
                     </button>
                  </div>
               </div>
               <div className="form-check">
                  <input
                     className="form-check-input"
                     type="checkbox"
                     value=""
                     style={{fontSize: 30}}
                  />
                  <label className="form-check-label" style={{color: "#fff", fontSize: 30}}>ایرانی</label>
               </div>
               <div className="form-check">
                  <input
                     className="form-check-input"
                     type="checkbox"
                     value=""
                     style={{fontSize: 30}}
                  />
                  <label className="form-check-label" style={{color: "#fff", fontSize: 30}}>فست فود</label>
               </div>
            </form>
         </div>

         <Login show={show} setShow={setShow}/>
      </div>
   );
};

export default Welcome;
