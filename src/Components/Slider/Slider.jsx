import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ToastContainer, toast } from 'react-toastify';
import SliderA from "./SliderA";
import "./customstyle.css"
import { useQuery } from "@tanstack/react-query";
import useSecure from "../../Hooks/useSecure";
const Slider = () => {
    const useAxiosSecure = useSecure();
     const {data:sliderItem=[]} = useQuery({
        queryKey:["slider"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/banner`);
            return res.data;
        }
    });
    console.log(sliderItem)
    const notify = (status,msg) => {
      if(status){
          toast.success(msg,{position: "top-center",})
      }else{
          toast.error(msg,{position: "top-center",})
      }
  };
  const handleMessage = (status,msg)=>{
    notify(status,msg)
  }
  return (
    <div className="">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Pagination,Navigation,Autoplay]}
        loop={true}
        autoplay="off"
        className="mySwiper"
      >
        {sliderItem.map((item, i) => (
          <SwiperSlide key={i}>
            <SliderA data={item} handleMessage={handleMessage} ></SliderA>
          </SwiperSlide>
        ))}
      </Swiper>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Slider;
