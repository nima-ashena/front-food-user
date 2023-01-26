import { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { getRestaurantApi, getUserOrdersApi } from '../../api/user.service';
import { convertState } from '../../utils/n';

import Header from '../header/Header';

const Orders = () => {
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      
      getUserOrdersApi((isOk, result) => {
         if (isOk) {
            setOrders(result.orders);

         }
      });
   }, []);
   return (
      <>
         <Header />
         <div className="container py-3">
            <ListGroup as="ol" numbered>
               {orders.map(item => {
                  return (
                     <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                     >
                        <div className="ms-2 me-auto">
                           <div className="fw-bold">{item.address}</div>
                           {item.totalSum} تومان
                        </div>
                        <Badge bg="primary" pill>
                        { convertState(item.state)} 
                        </Badge>
                     </ListGroup.Item>
                  );
               })}
               
            </ListGroup>
         </div>
      </>
   );
};

export default Orders;
