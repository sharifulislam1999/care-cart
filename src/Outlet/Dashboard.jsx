import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import logo from "../assets/images/logo.png";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
    const {user}= useAuth();
    const role = useRole();
    console.log(role)
    let dashboardLinks = <></>;
    if(role === 'user'){
        dashboardLinks =
        <div>
         <ul className="space-y-2 py-2">
            <li><NavLink className=' px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/userhome">Home</NavLink></li>
            <li><NavLink className=' px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/cart">Cart</NavLink></li>
            <li><NavLink className=' px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/userpayments">Payment History</NavLink></li>
        </ul>
    </div>
    }else if(role === 'seller'){
        dashboardLinks = 
        <div>
            <ul className="space-y-2 py-2">
                <li><NavLink className=' px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/sellerhome">Home</NavLink></li>
                <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/productmanage">Manage Medicine</NavLink></li>
                <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/sellerpayment">Payment History</NavLink></li>
                <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/sellerads">Advertisement Request.</NavLink></li>
            </ul>
        </div>
    }else if(role === "admin"){
        dashboardLinks =   <div>
        <ul className="space-y-2 py-2">
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/adminhome">Home</NavLink></li>
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/manageuser">Manage Users</NavLink></li>
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/managecategory">Manage Category</NavLink></li>
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/paymentmanagement">Payment Management</NavLink></li>
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/bannermanage">Banner Management</NavLink></li>
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/bannerrequest">Banner Request</NavLink></li>
            <li><NavLink className='px-3 py-1 block text-md font-normal text-white  ' to="/dashboard/salesreport">Sales Report</NavLink></li>
        </ul>
    </div>
    }
    return (
        <div>
            <div className="flex">
                <div className="w-[300px] h-screen">
                    <div className="flex justify-center border-b py-2">
                        <img className="w-1/2" src={logo} alt="" />
                    </div>
                    <div className="bg-[#008080] h-full">
                        {dashboardLinks}
                    </div>                   
                </div>
                <div className="flex-1 border">
                    <DashboardNav></DashboardNav>
                    <div className="p-4">
                    <Outlet></Outlet>    
                    </div>             
                </div>
            </div>
            
           
            
        </div>
    );
};

export default Dashboard;