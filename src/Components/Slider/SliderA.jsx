import propTypes from "prop-types";
import useAuth from './../../Hooks/useAuth';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useSecure from "../../Hooks/useSecure";
import useCart from "../../Hooks/useCart";

const SliderA = ({data,handleMessage}) => {
    console.log(data)
//   const { title, des, bg } = data;
const {
  _id,
medicineName,
genericName,
medicineCategory,
medicineCompany,
medicineDes,
medicineDiscount,
medicineImage,
medicinePrice,
medicineUnit,
medicineBgImage
} = data;
const {user} = useAuth();
const navigate = useNavigate();
const style = {
    backgroundImage: `linear-gradient(45deg, #000000CC, #000000CC), url(${medicineBgImage})`
}
const useAxiosSecure = useSecure();
const [,refetch] = useCart()
const handleCart = (id)=>{
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
  menuId: id,
  email: user?.email,
  image:medicineImage,
  price:medicinePrice,
  quantity:1
 }
 
 useAxiosSecure.post('/cart',cartItem)
 .then(res=>{
  if(res.data.message === "already added"){
    handleMessage(0,"Already Added")
    return;
  }
  if(res.data.insertedId){
    handleMessage(1,"Added Success")
    refetch();
  }
 })
 
  
}
  return (
    <div style={style} className={`flex justify-center items-center px-10 lg:px-0 relative h-auto lg:h-[80vh] bg-cover bg-center`}>
      <div className=""></div>
      <div className="container z-20 mx-auto px-3">
        <div className={`flex lg:flex-row flex-col gap-10 items-center`}>
          <div className="w-full lg:flex-1 lg:space-y-3 space-y-1">
            <h1 className="text-base py-1 font-medium bg-[#008080] inline-block px-3 rounded-full text-white">{genericName}</h1>
            <div className="text-3x lg:text-5xl font-bold leading-normal">
                <h1 className="text-white leading-snug">{medicineName}</h1>
            </div>
            <div className="text-base md:text-lg">
              <p
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay = "500"
               className="text-[#bdb9b9]">{medicineDes.length > 350 && medicineDes.slice(0,350) + " ..." }</p>
            </div>
            <div className=" ">
            {medicineDiscount !== '0' ? <div>
                <del className="font-medium text-white text-sm">Price: {medicinePrice}</del>
                <h1 className="text-3xl text-[#008080] font-bold">Offer Price: {medicinePrice - ((medicinePrice * medicineDiscount)/ 100) }</h1>
            </div> :<h1 className="text-3xl text-[#008080] font-bold">Price: {medicinePrice}</h1> }
            
            </div>
            <div>
                <table className="border border-[#bdb9b9]  w-1/2">
                    <thead>
                        <tr >
                            <th className="font-medium text-white border-[#bdb9b9] border">Category</th>
                            <th className="font-medium text-white border-[#bdb9b9] border">Company</th>
                            <th className="font-medium text-white border-[#bdb9b9] border">Unit</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td className="border border-[#bdb9b9] text-[#bdb9b9]">{medicineCategory}</td>
                            <td className="border border-[#bdb9b9] text-[#bdb9b9]">{medicineCompany}</td>
                            <td className="border border-[#bdb9b9] text-[#bdb9b9]">{medicineUnit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
              <button onClick={()=>handleCart(_id)} data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay = "1000"
               className="bg-[#008080] hover:bg-[#008080df] py-2 px-5 rounded-full font-bold text-white">
                Add To Cart
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center lg:w-1/4">
            <div className="flex w-96 justify-center relative p-10 bg-white py-9 rounded-badge">
                <img className="h-96 rounded-badge" src={medicineImage} alt="" />
               {medicineDiscount !== '0' &&  <div className="absolute flex justify-center items-center font-semibold text-white -top-5 right-0 h-16 w-16 rounded-full bg-[#008080]">
                    <span>{medicineDiscount}%<p>Off</p></span>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
SliderA.propTypes = {
  data: propTypes.object,
};

export default SliderA;
