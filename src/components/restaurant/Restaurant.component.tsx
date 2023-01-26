import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../../api";
import {IRestaurant} from "../../interfaces/restaurant.interface" 
import "./style.css"

const RestaurantComponent = (props: any) => {

   const navigate = useNavigate()

   const  restaurant: any  = props.restaurant;

   const cardClick = () => {
      navigate(`/user/restaurant/${restaurant._id}`)
   }

   return (
      <div className="col-sm-6 col-md-6 col-lg-4 rounded-2">
         <div className="card cartt" onClick={cardClick}>
            <img src={`${BASE_BACKEND_URL}/${restaurant.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
               <h5 className="card-title">{restaurant.name}</h5>
               <p className="card-text">
               </p>
               <span>
                  {restaurant.rating} <i className="bi bi-star-fill" style={{color: "yellow", fontSize: 25}}></i>
               </span>
            </div>
         </div>
      </div>
   );
};

export default RestaurantComponent;
