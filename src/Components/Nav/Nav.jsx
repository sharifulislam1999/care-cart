import useAuth from "./../../Hooks/useAuth";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import logo from "../../assets/images/logo.png"
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import "./Nav.css";
import { FaBars } from "react-icons/fa";

import { useState } from "react";
import useRole from "../../Hooks/useRole";
import useCart from "../../Hooks/useCart";
const Nav = () => {
  const [navToggle,setNavToggle] = useState(false);
  const [cart] = useCart();
  const {user,loading,handleLogOut} = useAuth();
  const [down,setDown] = useState(false);
  const handleOut = ()=>{
    handleLogOut()
    setDown(!down)
  }
  const [role] = useRole()
  let dashboardLink = '';
 if(role){
    if(role === "admin"){
        dashboardLink = '/dashboard/adminhome'
      }else if(role === 'seller'){
        dashboardLink = '/dashboard/sellerhome'
      }else{
        dashboardLink = '/dashboard/userhome'
      }
 }
  return (
    <div className="z-50">
      <div className="container mx-auto px-3">
        <div className="hidden lg:flex justify-between flex-col md:flex-row flex-wrap py-1 items-start md:gap-1 gap-1 md:items-center">
            <div className="flex-1 flex gap-1 md:gap-2 items-center flex-wrap">
                <div className="flex gap-1 items-center">
                    <div>
                    <IoLocationOutline />
                    </div>
                    <div>
                        <h1>Berlin, Germany</h1>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                <div>
                    <AiOutlineMail />
                    </div>
                    <div>
                        <h1>carecart@support.com</h1>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                <div>
                <MdOutlinePhone />

                    </div>
                    <div>
                        <h1>+89532454</h1>
                    </div>
                </div>               
            </div>
            <div className="flex justify-end gap-2">
                <div>
                    <select name="" id="" className="border focus:outline-none">
                        <option value="">English</option>
                        <option value="">Bangla</option>
                        <option value="">Germany</option>
                    </select>
                </div>
                <div>
                <label className="cursor-pointer grid place-items-center">
                    <input type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
                </div>
            </div>
        </div>





        <div className="flex justify-between items-center relative py-2 mt-1">
        <div className="lg:hidden text-2xl">
            <FaBars onClick={()=>setNavToggle(!navToggle)}/>
            </div>
            <div className="flex-1 hidden lg:block ">
                <div>
                    <Link to='/'>
                    <img className="w-[150px]" src={logo} alt="" /></Link>
                </div>
            </div>
            <div className="flex-1 lg:hidden">

            </div>
            
            <div className="flex-1 lg:hidden flex justify-center ">
                    <div>
                    <Link to='/'>
                    <img className="w-[120px]" src={logo} alt="" /></Link>
                </div>
            </div>
           
            <div className={`absolute ${navToggle ? "top-12":"-top-96"} lg:static  z-40 rounded-xl bg-black w-[150px] lg:bg-transparent lg:w-auto`}>
                <div>
                    <ul className="flex gap-2 p-5 lg:p-0 lg:gap-8 flex-col lg:flex-row text-[15px] font-medium">
                        <li><NavLink className={({isActive})=> isActive ? "navactive":"navpending"} to="/">Home</NavLink></li>
                        <li><NavLink className={({isActive})=> isActive ? "navactive":"navpending"} to="/shop">Shop</NavLink></li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-end flex-1">
              <div>
              <div className="flex gap-4 items-center">                   
                    <div className="relative">
                        <Link to='/cart'>                        
                        <div className="text-3xl">
                        <CiShoppingCart />
                            </div>
                        <div className="absolute rounded-full -top-2 -right-1 h-5 w-5 text-center text-white flex items-center justify-center text-sm bg-[#008080]">
                            <p className="">{cart.length}</p>
                        </div>
                        </Link>
                    </div>
                    <div>
                       {loading ? <span className="loading loading-spinner text-accent"></span> : user ? <>
                                <div className="relative z-50">
                                    <img onClick={()=>setDown(!down)} className="w-10 h-10 rounded-full border-2 object-fit cursor-pointer border-[#008080]" src={user?.photoURL} alt="" />
                                   {down &&  <div className={`absolute ${down ? 'scale-1 duration-200' : 'scale-0 duration-200'}  top-14 w-48 right-0 p-2 bg-[#008080] rounded-md`}>
                                        <ul className="text-center text-white space-y-2">
                                            <li onClick={()=>setDown(!down)} className="decoration-white decoration-1 hover:underline"><Link to='/updateprofile'>Update Profile</Link></li>
                                            <li onClick={()=>setDown(!down)} className="decoration-white decoration-1 hover:underline"><Link to={dashboardLink}>Dashboard</Link></li>
                                        </ul>
                                        <button onClick={handleOut} className="text-white border w-full py-1 my-2 rounded-md">Logout</button>
                                    <div className="absolute -top-1 right-3 h-4 bg-[#008080] w-4 rotate-45">                                     
                                        </div>
                                    </div>}
                                </div>                           
                            
                        </>: <div>
                            <Link className="px-3 p-1 inline-block bg-[#008080] text-white font-medium rounded-md border duration-200 border-[#008080] hover:bg-transparent hover:text-[#008080]" to='/login'>Join Now</Link>
                        </div>}
                        
                    </div>

                </div>
              </div>
            </div>
            <div>
            </div>            
        </div>




        
      </div>
    </div>
  );
};

export default Nav;
