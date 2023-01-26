import { IFood } from "./food.interface";


export interface IRestaurant{
   id: string,
   name: string,
   title: string,
   score: number,
   background: string,
   address?: string,
   foods?: IFood[], 
}

