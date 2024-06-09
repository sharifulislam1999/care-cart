import { createBrowserRouter } from "react-router-dom";
import Main from "../../Outlet/Main";
import Shop from "../../Pages/Shop/Shop";
import Error from "../../Pages/Error/Error";
import Login from './../../Pages/Login/Login';
import Dashboard from "../../Outlet/Dashboard";
import AdminHome from "../../Pages/Dashboard/AdminHome/AdminHome";
import PrivateRoute from './PrivateRoute';
import ManageUser from "../../Pages/Dashboard/ManageUser/ManageUser";
import ManageCategory from "../../Pages/Dashboard/ManageCategory/ManageCategory";
import PaymentManagement from "../../Pages/Dashboard/PaymentManagement/PaymentManagement";
import SalesReport from "../../Pages/Dashboard/SalesReport/SalesReport";
import SellerHome from "../../Pages/Dashboard/SellerHome/SellerHome";
import ProductManage from "../../Pages/Dashboard/ProductManage/ProductManage";
import SellerPayment from "../../Pages/Dashboard/SellerPayment/SellerPayment";
import SellerAds from "../../Pages/Dashboard/SellerAds/SellerAds";
import UserHome from "../../Pages/Dashboard/UserHome/UserHome";
import UserPayments from "../../Pages/Dashboard/UserPayments/UserPayments";
import BannerManage from "../../Pages/Dashboard/BannerManage/BannerManage";
import Home from "../../Pages/Home/Home";
import CategoryDetails from "../../Pages/CategoryDetails/CategoryDetails";
import BannerRequest from "../../Pages/BannerRequest/BannerRequest";
import Cart from './../../Pages/Cart/Cart';
import Payment from "../../Pages/Payment/Payment";
const Routes = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        errorElement: <Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path:'/category/:categoryname',
                element:<CategoryDetails></CategoryDetails>
            },
            {
                path:'/cart',
                element:<Cart></Cart>
            },
            {
                path:'/payment',
                element:<Payment></Payment>
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:"adminhome",
                element:<AdminHome></AdminHome>
            },
            {
                path:"manageuser",
                element:<ManageUser></ManageUser>
            },
            {
                path:"managecategory",
                element:<ManageCategory/>
            },
            {
                path:'paymentmanagement',
                element: <PaymentManagement></PaymentManagement>
            },
            {
                path:'salesreport',
                element: <SalesReport></SalesReport>
            },
            {
                path:'sellerhome',
                element:<SellerHome></SellerHome>
            },
            {
                path:'productmanage',
                element:<ProductManage></ProductManage>
            },
            {
                path:'sellerpayment',
                element:<SellerPayment></SellerPayment>
            },
            {
                path:'sellerads',
                element:<SellerAds></SellerAds>
            },
            {
                path:'userhome',
                element:<UserHome></UserHome>
            },
            {
                path:"cart",
                element:<Cart></Cart>
            },
            {
                path:'bannermanage',
                element:<BannerManage></BannerManage>
            },
            {
                path:'userpayments',
                element:<UserPayments></UserPayments>
            },
            {
                path:'bannerrequest',
                element:<BannerRequest></BannerRequest>
            }
        ]
    }
    
])

export default Routes;