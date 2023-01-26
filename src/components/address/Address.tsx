const Address = (props: any) => {
   const { address, setAddresses, index, deleteAddress } = props;

   return (
      <>
         <div
            className="d-flex p-1 align-items-center justify-content-between mb-2"
            style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}
         >
            <p>{address}</p>
            <i
               className="bi bi-trash text-danger"
               style={{ cursor: 'pointer' }}
               onClick={e => {
                  console.log(index);
                  deleteAddress(index);
               }}
            ></i>
         </div>
      </>
   );
};

export default Address;
