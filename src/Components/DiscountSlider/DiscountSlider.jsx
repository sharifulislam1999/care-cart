import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import usePublic from "../../Hooks/usePublic";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { CgPathUnite } from "react-icons/cg";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import useSecure from "../../Hooks/useSecure";
import useCart from "../../Hooks/useCart";
const DiscountSlider = () => {
  const navigate = useNavigate();
  const useAxiosSecure = useSecure()
  const [,refetch] = useCart()
  const axiosPublic = usePublic();
  const {user} = useAuth();
  const { data: discounted = [] } = useQuery({
    queryKey: ["discounted"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicinediscount");
      return res.data;
    },
  });
  const notify = (status,msg) => {
    if(status){
        toast.success(msg,{position: "top-center",})
    }else{
        toast.error(msg,{position: "top-center",})
    }
};
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
    name:item.medicineName,
    company:item.medicineCompany,
    seller: item.seller,
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
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {discounted.map((item, i) => (
          <SwiperSlide className="mb-10" key={i}>
            <div className="p-4 border flex flex-col duration-200 hover:scale-[101%] cursor-pointer rounded-md space-y-2">
              <div className="h-64 lg:h-56 relative">
                <img
                  className="h-full rounded-md w-full object-cover"
                  src={item.medicineImage}
                  alt=""
                />
                <div className="absolute top-2 left-2 py-1 text-sm rounded-full text-white font-medium px-3 bg-[#008080]">
                  <span>{item.genericName}</span>
                </div>
                {item.medicineDiscount !== "0" && (
                  <div className="absolute top-10 left-2 py-1 text-sm rounded-full text-white font-medium px-3 bg-red-700">
                    <span>{item.medicineDiscount} % off</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-medium">{item.medicineName}</h1>
              </div>
              <div>
                {item.medicineDiscount !== "0" ? (
                  <>
                    <div className="text-sm text-red-600 font-bold">
                      <del>Regular: {item.medicinePrice} Tk</del>
                    </div>
                    <div className="text-2xl font-bold text-[#008080]">
                      <h1>
                        Price:{" "}
                        {item.medicinePrice -
                          (item.medicinePrice * item.medicineDiscount) / 100}
                      </h1>
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-[#008080]">
                    <h1>Price: {item.medicinePrice}</h1>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <h1 className="flex bg-[#008080] px-2 rounded-full text-sm text-white items-center gap-1">
                  <TbCategory />
                  {item.medicineCategory}
                </h1>
                <h1 className="flex bg-[#008080] px-2 rounded-full text-sm text-white items-center gap-1">
                  <BsBuildings />
                  {item.medicineCompany}
                </h1>
                <h1 className="flex bg-[#008080] px-2 rounded-full text-sm text-white items-center gap-1">
                  <CgPathUnite />
                  {item.medicineUnit}
                </h1>
              </div>
              <div className="flex-grow">
                <span>
                  {item.medicineDes.length > 50
                    ? item.medicineDes.slice(0, 100) + "..."
                    : item.medicineDes}
                </span>
              </div>
              <div>
                <div>
                  <button onClick={()=>handleCart(item)} className="w-full bg-[#008080] hover:bg-[#008080df] py-1 rounded-md text-white font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
             
            </div>
          </SwiperSlide>
        ))}
         <ToastContainer/>
      </Swiper>
    </>
  );
};

export default DiscountSlider;
