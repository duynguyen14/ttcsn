function CartFooter({ totalPrice, handleOnclickOrder, showVoucher,selectedVoucher }) {
  console.log("3",selectedVoucher)
  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md font-Montserrat">
      <div className="flex justify-center items-center">
        <p className="text-lg font-semibold text-red-500 pr-5">
              Tổng tiền: {totalPrice} VND
        </p>    
          {selectedVoucher&&
          <p className="text-primary font-semibold text-sm">
            (1 voucher đã được sử dụng)
          </p>
          }
      </div>
      <div className="flex gap-3">  
        <button onClick={showVoucher} className="button-primary px-4 py-2 bg-primary">
          Chọn voucher
        </button>
        <button onClick={handleOnclickOrder} className="button-primary px-4 py-2 bg-green-500">
          Đặt hàng
        </button>
      </div>
    </div>
  );
}

export default CartFooter;
