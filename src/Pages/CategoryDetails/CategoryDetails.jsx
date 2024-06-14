import { useQuery } from "@tanstack/react-query";
import useSecure from "../../Hooks/useSecure";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Banner from "../../Components/Banner/Banner";
import { FaEye } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";
import useCart from "../../Hooks/useCart";
import Swal from 'sweetalert2'
const CategoryDetails = () => {
    const useAxiosSecure = useSecure();
    const {user} = useAuth();
    const [modal,setModal] = useState(false);
    const [modalData,setModalData] = useState({})
    const categoryName = useParams().categoryname
    const navigate = useNavigate();
    const [,refetch] = useCart();
    // categoryname
    const {data:details=[]} = useQuery({
        queryKey:["details"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/categorycount/${categoryName}`);
            return res.data.data;
        }
    })
    
    const totalCount = details.length;
    const itemPerPage = 3;
    const [currentPage,setCurrentPage] = useState(0);
    const numberofPages = Math.ceil(totalCount / itemPerPage);
    const pages = [...Array(numberofPages).keys()];
    const {data:pagination=[],refetch:paginationRefetch} = useQuery({
        queryKey:["pagination"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/categorypagination?page=${currentPage}&size=${itemPerPage}&category=${categoryName}`);
            return res.data;
        }
    })
    useEffect(()=>{
        paginationRefetch()
    },[currentPage])
    console.log(pagination)






















    const notify = (status,msg) => {
        if(status){
            toast.success(msg,{position: "top-center",})
        }else{
            toast.error(msg,{position: "top-center",})
        }
    };
console.log(modalData)
    const handleDetails = (data)=>{
        setModalData(data)
        setModal(true)

    }
    const handleCart = (item)=>{
        if(!user){
          Swal.fire({
            title: "Are you not log in",
            text: "Please Click login Button",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log in"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login')     
            }
          });
          return;
       }
       const cartItem = {
        menuId: item._id,
        seller:item.seller,
        user: user?.email,
        image:item.medicineImage,
        price:item.medicinePrice,
        quantity:1
       }
       
       useAxiosSecure.post('/cart',cartItem)
       .then(res=>{
        if(res.data.message === "already added"){
          notify(0,"Already Added")
          return;
        }
        if(res.data.insertedId){
            notify(1,"Added Success")
          refetch();
      
        }
       })
       
        
      }
    return (
        <div>

            {/*  */}












                 {/* modal */}
                 <div className={`fixed z-20 ${modal ? 'scale-1 bottom-0 opacity-1' : 'scale-0 opacity-0 bottom-[500px]'} flex justify-center items-center duration-500  left-0 w-full h-full bg-black bg-opacity-50`}>
                <div className="lg:w-[80%] md:w-[90%] w-[90%] relative rounded-lg bg-white h-[95vh] overflow-y-auto lg:h-auto">
                <div onClick={()=>{
                    setModal(false);
                    setModalData({})
                    // reset();
                    // setUpdate(false);
                    // setOldData({})
                }
                    } className="absolute top-4 right-4 duration-200 hover:bg-[#008080df] bg-[#008080] p-2 text-xl text-white rounded-md cursor-pointer" >
                <IoMdClose />
                </div>   
                    <div className="mt-10 lg:p-10 p-5">
                        <div className="flex flex-col lg:flex-row gap-7 items-center">
                            <div className="w-full lg:flex-1 p-2">
                                <div className="h-[450px] relative">
                                    <img className="h-full w-full object-cover rounded-lg" src={modalData.medicineImage} alt="" />
                                    {modalData.medicineDiscount !== "0" && <div className="absolute rounded-full top-4 left-4 bg-red-800">
                                        <h1 className="px-3 text-white font-semibold">{modalData.medicineDiscount} % Off</h1>
                                    </div>}
                                </div>


                            </div>
                            <div className="w-full lg:flex-1 p-2 space-y-3">
                                <div>
                                    <h1 className="px-2 font-semibold text-sm text-white bg-[#008080] inline-block rounded-full">{modalData.genericName}</h1>
                                </div>
                                <div className="text-4xl font-medium">
                                    <h1>{modalData.medicineName}</h1>
                                </div>
                                <div>
                                    <h1>{modalData.medicineDes}</h1>
                                </div>
                                <div>
                                    {modalData.medicineDiscount !== "0" ?
                                    <div>
                                        <h1 className="font-semibold">Regular Price: <del>{modalData.medicinePrice} TK</del></h1>
                                        <h1 className="text-[#008080] text-2xl font-semibold">Discount Price: {modalData.medicinePrice - ((modalData.medicinePrice * modalData.medicineDiscount) / 100 )} TK</h1>
                                    </div>:<div>
                                    <h1 className="text-[#008080] text-2xl font-semibold">Price: {modalData.medicinePrice} TK</h1>
                                    </div>    
                                }
                                </div>
                                <div>
                                <table className="border w-full border-[#0E1A29]">
                    <thead>
                        <tr >
                            <th className="font-medium text-[#0E1A29] border-[#0e1a2986] border">Category</th>
                            <th className="font-medium text-[#0E1A29] border-[#0e1a2986] border">Company</th>
                            <th className="font-medium text-[#0E1A29] border-[#0e1a2986] border">Unit</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td className="border border-[#0e1a2986] text-[#0E1A29]">{modalData.medicineCategory}</td>
                            <td className="border border-[#0e1a2986] text-[#0E1A29]">{modalData.medicineCompany}</td>
                            <td className="border border-[#0e1a2986] text-[#0E1A29]">{modalData.medicineUnit}</td>
                        </tr>
                    </tbody>
                </table>
                        <div className="mt-4">
                        <button onClick={()=>handleCart(modalData)} className='  bg-[#008080] hover:bg-[#008080df] py-1 px-3 rounded-md text-white font-medium'>Add to Cart</button>

                        </div>

                                </div>
                            </div>
                        </div>
                       <div>
                       </div>
                    </div>
                </div>
                

                </div>





















            {/*  */}

            <div>
                <Banner title={categoryName}></Banner>
            </div>
            <div className="container mx-auto px-3 overflow-x-auto">
            <div className="mt-10">
            <table className="table table-xs w-full border">
            <thead>
                <tr>
                    <th className="border">Serial</th> 
                    <th className="border">Medicine Name</th> 
                    <th className="border">Generic Name</th> 
                    <th className="border">Medicine Company</th> 
                    <th className="border">Price</th> 
                    <th className="border text-center">View</th> 
                    <th className="border text-center">Add to cart</th>
                </tr>
            </thead> 
            <tbody>
                 {pagination.map((item,i)=> <tr key={i}>
                    <th className="border">{i+1}</th> 
                    <td className="border">{item.medicineName}</td> 
                    <td className="border">{item.genericName}</td> 
                    <td className="border">{item.medicineCompany}</td> 
                    <td className="border">{item.medicinePrice}</td> 
                    <td className="border justify-center text-md">
                        <div className="flex justify-center">
                        <FaEye onClick={()=>handleDetails(item)} className="cursor-pointer" />
                        </div></td> 
                    <td className="border justify-center text-md">
                    <div className="flex justify-center">
                        <FaCartPlus onClick={()=>handleCart(item)} className="cursor-pointer"/>
                        </div></td> 
                 </tr> )}            
                </tbody>
            </table>  
            <div className="flex justify-center mt-10">
                <div className="pagination">
                    {pages.map((item,i)=>(
                        <button key={i} className={`btn ml-2  ${currentPage === item && 'bg-[#008080] text-white' }`} onClick={()=>setCurrentPage(item)} >{item}</button>
                    ))}
                </div>
            </div>             
            </div>
        </div>
        <ToastContainer></ToastContainer>
        </div>
    );
};

export default CategoryDetails;