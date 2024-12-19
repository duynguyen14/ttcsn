function CartFooter({ cartgoods, isAllSelected, handleSelectAll, selectedItems, handleOnclickOrder, setShowVoucher }) {
    const total = () => selectedItems.reduce((sum, item) => sum + item.quantity * item.good.price, 0);
  
    return (
      <div className="sticky bottom-0 bg-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
            <span>Chọn tất cả ({cartgoods.length} sản phẩm)</span>
          </div>
          <div>
            <button onClick={() => setShowVoucher(true)}>Chọn voucher</button>
          </div>
          <div>
            <span>Tổng tiền: {total()}</span>
          </div>
          <button onClick={handleOnclickOrder} className="bg-red-500 px-4 py-2 text-white">
            Mua hàng
          </button>
        </div>
      </div>
    );
  }
  
  export default CartFooter;
  