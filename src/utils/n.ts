export const convertState = (i: string) => {
   let ans = '';
   switch (i) {
      case 'preparing':
         ans = 'در حال آماده سازی';
         break;
      case 'delivering':
         ans = 'در حال ارسال'
         break;
      case 'delivered':
         ans = 'دریافت شده'
         break;
      case 'canceled':
         ans = 'لغو شده'
         break;
   }
   return ans;
};
