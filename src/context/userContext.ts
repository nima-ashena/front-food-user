import { createContext } from 'react';

export const UserContext = createContext({
   isUserLogin: false,
   setIsUserLogin: (auth: boolean) => {},
   addressIndex: -1,
   setAddressIndex: (index: number) => {},
   address: '',
   setAddress: (address: string) => {},
   addresses: [],
   setAddresses: data => {},
   user: { name: '', email: '', phone: '' },
   setUser: (data: any) => {},
   order: { foods: [], address: '', phoneToContact: '', restaurantName: '', restaurantId: '' },
   setOrder: (data: any) => {},
});
