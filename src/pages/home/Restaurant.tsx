import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_BACKEND_URL } from '../../api';
import {
   getRestaurantApi,
   getRestaurantFoodsApi,
} from '../../api/user.service';
import FoodComponent from '../../components/food/Food.component';
import Header from '../../components/header/Header';
import RestaurantComponent from '../../components/restaurant/Restaurant.component';
import { UserContext } from '../../context/userContext';
import { IRestaurant } from '../../interfaces/restaurant.interface';

const Restaurant = () => {
   // const
   const { restaurantId } = useParams();

   const [restaurant, setRestaurant] = useState<any>({ name: '', image: '' });

   const [foods, setFoods] = useState([]);

   useEffect(() => {
      getRestaurantApi(restaurantId, (isOk, result) => {
         if (isOk) {
            setRestaurant(result.restaurant);
         } else {
            toast.warn(result.response.data.message);
         }
      });

      getRestaurantFoodsApi(restaurantId, (isOk, result) => {
         if (isOk) {
            setFoods(result.foods);
         } else {
            toast.warn(result.response.data.message);
         }
      });
   }, []);

   return (
      <>
         <Header />
         <div className="container py-4">
            <div className="row py-3">
               <div className="col-md-4 d-flex flex-column align-items-center mb-5">
                  <div className="card">
                     <img
                        src={`${BASE_BACKEND_URL}/${restaurant.image}`}
                        className="card-img-top"
                        alt="..."
                     />
                     <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                        <p
                           className="card-text text-secondary"
                           style={{ fontSize: 15 }}
                        >
                           {restaurant.address}
                        </p>
                        <span>
                           {restaurant.rating}{' '}
                           <i
                              className="bi bi-star-fill"
                              style={{ color: 'yellow', fontSize: 25 }}
                           ></i>
                        </span>
                     </div>
                  </div>
               </div>
               <div className="col-md-8">
                  <div
                     className="alert alert-dark text-center"
                     style={{ fontSize: 22, fontWeight: 500 }}
                     role="alert"
                  >
                     غذا ها
                  </div>
                  <div className="row g-3">
                     {foods.map(item => {
                        return (
                           <FoodComponent
                              food={item}
                              restaurantName={restaurant.name}
                              restaurantId={restaurant._id}
                           />
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Restaurant;
