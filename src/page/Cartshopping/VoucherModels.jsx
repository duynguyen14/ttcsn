function VoucherModal({ setShowVoucher }) {
    return (
      <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="w-[800px] h-[700px] bg-white rounded-xl">
          <div className="text-center">
            <p className="pt-5 font-semibold text-xl">Voucher của bạn</p>
            {/* Hiển thị danh sách voucher */}
          </div>
          <div className="flex justify-end mx-5">
            <button onClick={() => setShowVoucher(false)} className="button-primary px-5 py-2 bg-primary">
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default VoucherModal;
  