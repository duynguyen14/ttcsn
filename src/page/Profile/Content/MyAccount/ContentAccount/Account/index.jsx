function Account() {
    return ( 
    <div>
       <form action="" className="flex flex-col gap-y-5">
            {/* tên đăng nhập */}
                <div className="flex flex-col font-bold text-base gap-y-2">
                    <label htmlFor="name">Tên đăng nhập <span className="text-xs">&#10043;</span></label>
                    <input type="text" id="name" className="border-2 w-[50%] h-12 border-gray-500  focus:outline-primary px-2"/>
                </div>
                {/* địa chỉ email */}
                <div className="flex flex-col font-bold text-base gap-y-2">
                    <label htmlFor="name">Địa chỉ email <span className="text-xs">&#10043;</span></label>
                    <input type="text" id="name" className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"/>
                </div>
                {/* Mật khẩu */}
                <div className="flex flex-col font-bold text-base gap-y-2">
                    <label htmlFor="name">Mật khẩu <span className="text-xs">&#10043;</span></label>
                    <input type="text" id="name" className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"/>
                </div>
                {/* Mật khẩu mới */}
                <div className="flex flex-col font-bold text-base gap-y-2">
                    <label htmlFor="name">Mật khẩu mới <span className="text-xs">&#10043;</span></label>
                    <input type="text" id="name" className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"/>
                </div>
                {/* Xác nhận mật khẩu mới */}
                <div className="flex flex-col font-bold text-base gap-y-2">
                    <label htmlFor="name">Xác nhận mật khẩu <span className="text-xs">&#10043;</span></label>
                    <input type="text" id="name" className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"/>
                </div>
                {/* Lưu thông tin */}
                <div className="items-center w-full">
                    <button className="px-3 py-3 text-white bg-primary hover:bg-primary/65 font-bold  rounded-md transition-all duration-500 ease-in-out">Lưu thông tin</button>
                </div>
            </form>
    </div> );
}

export default Account;