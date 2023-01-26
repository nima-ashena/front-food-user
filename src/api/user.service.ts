import axios from 'axios';
import { BASEURL } from '.';

// get Restaurant
export const getRestaurantApi = (restaurantId, callBack: Function) => {
   axios
      .get(`${BASEURL}/user/restaurant/${restaurantId}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false);
      });
};

// get Restaurants
export const getRestaurantsApi = (callBack: Function) => {
   axios
      .get(`${BASEURL}/user/restaurant`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false);
      });
};

// get Restaurants
export const getRestaurantsQApi = (q ,callBack: Function) => {
   axios
      .get(`${BASEURL}/user/restaurant?search=${q}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false);
      });
};

//get Foods
export const getRestaurantFoodsApi = (restaurantId, callBack: Function) => {
   axios
      .get(`${BASEURL}/user/food/restaurant/${restaurantId}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false);
      });
};

// add order
export const addRestaurantApi = (
   restaurantId,
   data: any,
   callBack: Function,
) => {
   axios
      .post(`${BASEURL}/user/order/${restaurantId}`, data, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

//get Orders
export const getUserOrdersApi = (callBack: Function) => {
   axios
      .get(`${BASEURL}/user/order/current`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false);
      });
};
