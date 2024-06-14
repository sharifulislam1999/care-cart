import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import logo from "../assets/images/logo.png";
import DashboardNav from "./DashboardNav";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";


const Dashboard = () => {
    const {user}= useAuth();
    const [role] = useRole();
    const [navToggle,setNavToggle] = useState(false)
    console.log(role)
    let dashboardLinks = <></>;
    if(role === 'user'){
        dashboardLinks =
        <div>
         <ul className="space-y-2 py-2">
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className=' px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/userpayments">Payment History</NavLink></li>
        </ul>
    </div>
    }else if(role === 'seller'){
        dashboardLinks = 
        <div>
            <ul className="space-y-2 py-2">
                <li><NavLink onClick={()=>setNavToggle(!navToggle)} className=' px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/sellerhome">Home</NavLink></li>
                <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/productmanage">Manage Medicine</NavLink></li>
                <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/sellerpayment">Payment History</NavLink></li>
                <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/sellerads">Advertisement Request.</NavLink></li>
            </ul>
        </div>
    }else if(role === "admin"){
        dashboardLinks =   <div>
        <ul className="space-y-2 py-2">
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/adminhome">Home</NavLink></li>
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/manageuser">Manage Users</NavLink></li>
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/managecategory">Manage Category</NavLink></li>
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/paymentmanagement">Payment Management</NavLink></li>
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/bannermanage">Banner Management</NavLink></li>
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/bannerrequest">Banner Request</NavLink></li>
            <li><NavLink onClick={()=>setNavToggle(!navToggle)} className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/salesreport">Sales Report</NavLink></li>
        </ul>
    </div>
    }
    return (
        <div>
            <div className="flex">
                <div className={`w-[300px] z-20 bg-[#008080] h-screen absolute ${navToggle ? "left-0":"-left-96"} lg:static`}>
                    <div className="absolute lg:hidden right-2 top-2 text-white cursor-pointer" onClick={()=>setNavToggle(!navToggle)}>
                    <FaTimes />

                    </div>
                    <div className="flex  justify-center py-2">
                        
                        <img className="w-1/2" src={logo} alt="" />
                    </div>
                    <div className=" h-full">
                        {dashboardLinks}
                    </div>                   
                </div>
                <div className="flex-1 border">
                    <DashboardNav navToggle={navToggle} setNavToggle={setNavToggle}></DashboardNav>
                    <div className="p-4">
                    <Outlet></Outlet>    
                    </div>             
                </div>
            </div>
            
           
            
        </div>
    );
};

export default Dashboard;