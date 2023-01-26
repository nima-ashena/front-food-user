import { useState, useContext, useEffect } from 'react';
import { Badge, Button } from 'react-bootstrap';

import { BASE_BACKEND_URL } from '../../api';
import { UserContext } from '../../context/userContext';
import { IFood } from '../../interfaces/food.interface';

const FoodComponent = (props: any) => {
   const { food, restaurantName, restaurantId } = props;

   const [count, setCount] = useState(0);
   
   const { order, setOrder, address, user, addressIndex, addresses } = useContext(UserContext);

   const cardClick = () => {
      
   };

   const addFoodClick = e => {
      setCount(count + 1);
      let c = count
      c++
      let obj = { ...order };
      obj.restaurantName = restaurantName;
      obj.restaurantId = restaurantId;
      const i = obj.foods.findIndex(e => e.food == food._id);
      if (i > -1) {
         /* foods contains the element we're looking for, at index "i" */
         obj.foods[i] = {
            name: food.name,
            price: food.price,
            food: food._id,
            count: c,
         };
      } else {
         obj.foods.push({
            name: food.name,
            price: food.price,
            food: food._id,
            count: c,
         });
      }
      obj.phoneToContact = user.phone
      obj.address = addresses[addressIndex]
      setOrder({ ...obj });
   };

   return (
      <div className="col-sm-6 col-md-6 col-lg-4 rounded-2">
         <div className="card cartt" onClick={cardClick}>
            <img
               src={`${BASE_BACKEND_URL}/${food.image}`}
               className="card-img-top"
               alt="..."
            />
            <div className="card-body">
               <h5 className="card-title">{food.name}</h5>
               <p
                  className="card-text text-secondary"
                  style={{ fontSize: 11, height: 50, overflow: 'hidden' }}
               >
                  {food.ingredients}
               </p>
               <p className="card-text">{food.price} تومان</p>
               <div className="d-flex justify-content-between">
                  <span>
                     {food.rating}{' '}
                     <i
                        className="bi bi-star-fill"
                        style={{ color: 'yellow', fontSize: 25 }}
                     ></i>
                  </span>
                  <button
                     className="btn btn-primary"
                     style={{ borderRadius: '8px' }}
                     onClick={e => {
                        addFoodClick(e);
                     }}
                  >
                     {count != 0 && (
                        <Badge bg="light" text="dark">
                           {count}
                        </Badge>
                     )}{' '}
                     افزودن
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FoodComponent;
