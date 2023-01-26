import { useContext, useEffect, useState } from 'react';

import { Badge, ListGroup, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addRestaurantApi } from '../../api/user.service';
import { UserContext } from '../../context/userContext';

const Order = (props: any) => {
   const { show, setShow } = props;

   const [sum, setSum] = useState(0);
   const { order, setOrder, address } = useContext(UserContext);

   const handleClose = () => {
      setShow(false);
   };

   useEffect(() => {
      let s = 0;
      for (let i in order.foods) {
         s += order.foods[i].price;
      }
      setSum(s);
   }, [order]);

   const orderClick = e => {
      let obj = {...order}
      
      addRestaurantApi(order.restaurantId, obj, (isOk, result) => {
         if (isOk) {
            console.log(result);
            toast.success('سفارش شما با موفقت ثبت شد')
            setShow(false)
         } else {
            console.log(result.message);
            toast.error(result.response.data.message);
         }
      });
   };

   return (
      <>
         <Modal show={show} onHide={handleClose}>
            {order.restaurantName == '' ? (
               <Modal.Header closeButton>
                  <Modal.Title>سبد خرید شما خالی است</Modal.Title>
               </Modal.Header>
            ) : (
               <>
                  <Modal.Header closeButton>
                     <Modal.Title>
                        خرید از رستوران {order.restaurantName}
                     </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <form>
                        <Modal.Body>
                           <ListGroup as="ol" numbered>
                              {order.foods.map(item => {
                                 return (
                                    <ListGroup.Item
                                       as="li"
                                       className="d-flex justify-content-between align-items-start"
                                    >
                                       <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                             {item.name}
                                          </div>
                                          {item.price} تومان
                                       </div>
                                       <Badge bg="primary" pill>
                                          {item.count}
                                       </Badge>
                                    </ListGroup.Item>
                                 );
                              })}
                              <hr />
                              <ListGroup.Item
                                 as="li"
                                 className="d-flex justify-content-between align-items-start mt-2"
                              >
                                 <div className="ms-2 me-auto">
                                    <div className="fw-bold">جمع کل</div>
                                    تومان {sum}
                                 </div>
                              </ListGroup.Item>
                           </ListGroup>
                        </Modal.Body>
                        <button
                           type="submit"
                           className="btn btn-primary w-100"
                           onClick={e => {
                              e.preventDefault()
                              orderClick(e);
                           }}
                        >
                           پرداخت
                        </button>
                     </form>
                  </Modal.Body>
               </>
            )}
         </Modal>
      </>
   );
};

export default Order;
