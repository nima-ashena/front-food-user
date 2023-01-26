import { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getRestaurantsApi, getRestaurantsQApi } from '../../api/user.service';
import Header from '../../components/header/Header';
import RestaurantComponent from '../../components/restaurant/Restaurant.component';

import { UserContext } from '../../context/userContext';
import { ICategory } from '../../interfaces/category.interface';
import { IRestaurant } from '../../interfaces/restaurant.interface';

const Home = () => {

   // const { q } = useParams();
   const [categories, setCategories] = useState<ICategory[]>([]);
   const [restaurants, setRestaurants] = useState<any[]>([]);

   useEffect(() => {
      setCategories([
         {
            id: 'Irani',
            title: 'ایرانی',
            active: false,
         },
         {
            id: 'FastFood',
            title: 'فست فود',
            active: false,
         },
         {
            id: 'Seafood',
            title: 'غذای دریایی',
            active: false,
         },
      ]);

      getRestaurantsQApi('محلل', (isOk, result) => {
         if(isOk){
            setRestaurants(result.restaurants)
         }else{

         }
      })
      setRestaurants([
         {
            id: 'asd',
            title: 'فست فود شیلا',
            score: 4.8,
            background:
               'https://cdn.snappfood.ir/300x200/uploads/images/vendor-cover-app-review/8/13.jpg',
         },
      ]);
   }, []);

   const categoryClick = (e: any) => {
      for (let index in categories) {
         categories[index].active = false;
      }
      let t = categories.filter(item => {
         if (item.id == e.target.id) {
            item.active = true;
         }
         return item;
      });
      setCategories(t);
   };

   return (
      <>
         <Header />
         <div className="container py-4">
            <div className="row py-3">
               <div className="col-md-4 d-flex flex-column align-items-center mb-5">
                  <select
                     className="form-select col-4 p-3 mb-4"
                     aria-label=".form-select-sm example"
                  >
                     <option selected>بالاترن امتیاز</option>
                     <option value="1">گران ترین</option>
                     <option value="2">ارزان ترین</option>
                     <option value="3">جدید ترین</option>
                  </select>
                  <ListGroup className="w-100">
                     <ListGroup.Item className="bg-secondary text-light">
                        دسته بندی ها
                     </ListGroup.Item>
                     {categories.map(item => {
                        return (
                           <ListGroup.Item
                              key={item.id}
                              id={item.id}
                              action
                              onClick={e => {
                                 categoryClick(e);
                              }}
                              active={item.active}
                           >
                              {item.title}
                           </ListGroup.Item>
                        );
                     })}
                  </ListGroup>
               </div>
               <div className="col-md-8">
                  <div
                     className="alert alert-dark text-center"
                     style={{ fontSize: 22, fontWeight: 500 }}
                     role="alert"
                  >
                     رستوران ها
                  </div>
                  <div className="row g-3">
                     {restaurants.map(item => {
                        return <RestaurantComponent restaurant={item} />;
                     })}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
