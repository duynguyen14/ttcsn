import {useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { LoginUser } from '../../redux/Actions';
import ListUsers from '../../api/users';
function Login() {
    const UserStatus=useSelector(state=>state.user.status);
    const dispatch=useDispatch();
    const [showpassword,setShowPassword]=useState(false);
    const [showmesage,setShowmessage]=useState(false);
    const [message,setMessage]=useState("");
    const [user,setUser]=useState({
        email: "",
        name:"",
        password: "",
    })
    const handleOnchange=(e)=>{
        const {name, value}=e.target;
        setUser({
            ...user,
            [name]: value
        })
        setShowmessage(false)
        
    }
    const navigate=useNavigate();
    let fouderUser=null;
    const handleOnsumbit=(e)=>{
        e.preventDefault();
        if(user.password==="" || user.email===""){
            setMessage("Điền đầy đủ thông tin đăng nhập!");
            setShowmessage(true)
            return;
        }
        for(let i=0;i<ListUsers.length;i++){
            if(ListUsers[i].email===user.email && ListUsers[i].password===user.password){
                fouderUser=ListUsers[i];
            }
        }
        if(fouderUser){
            dispatch(LoginUser(fouderUser))
            setShowmessage(false);
            alert("Đăng nhập thành công!")
            navigate("/")
        }
        else{
            setMessage("Mật khẩu hoặc địa chỉ gmail không đúng");
            setShowmessage(true);
            return;
        }
    }
    return ( 
        // login page
        <div className="flex justify-center items-center h-screen font-Montserrat">
            <form action="" className='w-full flex justify-center items-center'
            onSubmit={handleOnsumbit}
            >
                <div className="font-Montserrat w-[100%] md:w-[50%] xl:w-[30%] border-2 md:border-gray-200 rounded-md flex flex-col gap-y-2 items-center mx-2">
                    <p className="font-bold text-primary  text-sm lg:text-3xl uppercase text-center mt-5">
                        phdtech
                    </p>
                    <p className='font-bold text-2xl'>
                        Đăng nhập
                    </p>
                    <div className="flex flex-col py-3 w-full relative group items-center">
                    <label htmlFor="email" className='text-left w-full px-6 font-semibold py-2'>Email</label>
                    <input type="text" placeholder="Địa chỉ gmail" id='email'
                        className="input-form"
                        value={user.email} name='email'
                        onChange={(e)=>handleOnchange(e)}
                        />
                    <FaUser className='absolute right-8 top-[70px] lg:right-10 font-bold lg:text-xl group-focus:text-primary '/>
                    {showmesage&& <p className='text-xs w-full px-6 text-left font-bold text-red-500 absolute bottom-[-10px]'>Lỗi! {message}</p>}
                    </div>
                    <div className="flex flex-col items-center py-3 w-full text-sm lg:text-base group relative">
                        <label htmlFor="password" className='font-semibold w-full px-6 py-2 text-left'>Mật khẩu</label>
                        <input placeholder="Mật khẩu" id='password'
                        type={showpassword? "text": "password"}
                        className="input-form"
                        value={user.password} name='password'
                        onChange={(e)=>handleOnchange(e)}
                        />
                        <FaEye className='absolute right-8 top-[70px] lg:right-10 font-bold lg:text-xl group-focus:text-primary cursor-pointer' onClick={()=>setShowPassword(!showpassword)}/>
                        {showmesage&& <p className='text-xs w-full px-6 text-left font-bold text-red-500 absolute bottom-[-10px]'>Lỗi! {message}</p>}
                    </div>
                    {/* xử lý */}
                    <div className="grid grid-cols-2 gap-x-10 font-bold text-primary text-xs md:text-sm py-2"> 
                        <div>
                            <input type="checkbox" id='remember'/>
                            <label htmlFor="remember">Ghi nhớ mật khẩu</label>
                        </div>
                        <p className='hover:text-red-500'>
                            <Link>
                                Quên mật khẩu ?
                            </Link>
                        </p>
                    </div>
                    {/* button */}
                    <button className="px-3 py-2 mx-3 lg:py-3 w-[90%]  bg-primary hover:bg-primary/70 transition-all duration-500 ease-in-out rounded-md text-white font-semibold">Đăng nhập</button>
                    <div className='font-bold text-xs lg:text-base mb-2 text-black'>
                        <p>
                            Bạn chưa có tài khoản? 
                            <Link 
                            to={"/regester"}
                            className='text-primary hover:text-red-500'>Đăng ký</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
     );
}
export default Login;