import axios from 'axios';
import { BASEURL } from '.';

type ApiFunction = (isOk: boolean, resultData?: any) => void;

// login
export const loginApi = (data: any, callBack: ApiFunction) => {
   axios
      .post(`${BASEURL}/user/login`, data)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         console.log(err.message);
         callBack(false, err);
      });
};

// Sign Up
export const signUpApi = (data: any, callBack: ApiFunction) => {
   axios
      .post(`${BASEURL}/user/signup`, data)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         console.log(err.message);
         callBack(false, err);
      });
};

// get user
export const getUserApi = (callBack: Function) => {
   axios
      .get(`${BASEURL}/user`, {
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

// edit user
export const editUserApi = (formData: any, callBack: Function) => {
   axios
      .patch(`${BASEURL}/user`, formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      },)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false);
      });
};
