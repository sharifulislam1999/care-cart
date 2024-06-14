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
import AdminRoutes from "./AdminRoutes";
import SellerRoutes from "./SellerRoutes";
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
                element:<PrivateRoute><Cart></Cart></PrivateRoute>
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:"adminhome",                
                element:<AdminRoutes><AdminHome></AdminHome></AdminRoutes>
            },
            {
                path:"manageuser",
                element:<AdminRoutes><ManageUser></ManageUser></AdminRoutes>
            },
            {
                path:"managecategory",
                element:<AdminRoutes><ManageCategory/></AdminRoutes>
            },
            {
                path:'paymentmanagement',
                element: <AdminRoutes><PaymentManagement></PaymentManagement></AdminRoutes>
            },
            {
                path:'salesreport',
                element: <AdminRoutes><SalesReport></SalesReport></AdminRoutes>
            },
            // seller router
            {
                path:'sellerhome',
                element:<SellerRoutes><SellerHome></SellerHome></SellerRoutes>
            },
            {
                path:'productmanage',
                element: <SellerRoutes> <ProductManage></ProductManage></SellerRoutes>
            },
            {
                path:'sellerpayment',
                element:<SellerRoutes><SellerPayment></SellerPayment></SellerRoutes>
            },
            {
                path:'sellerads',
                element:<SellerRoutes><SellerAds></SellerAds></SellerRoutes>
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
                element:<AdminRoutes><BannerRequest></BannerRequest></AdminRoutes>
            }
        ]
    }
    
])

export default Routes;