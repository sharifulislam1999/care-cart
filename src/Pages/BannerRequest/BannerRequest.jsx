import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useSecure from "../../Hooks/useSecure";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import usePublic from "../../Hooks/usePublic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BannerRequest = () => {
    const [modal,setModal] = useState(false);
    const [modalData,setModalData] = useState({})
    const useAxiosSecure = useSecure();
    const axiosPublic = usePublic();
    const imageHostKey = import.meta.env.VITE_UPLOAD_KEY;
    const image_upload_api = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const {data:request=[],refetch} = useQuery({
        queryKey:["bannerrequest"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/bannerrequest');
            return res.data;
        }
    })
    const notify = (status,msg) => {
        if(status){
            toast.success(msg,{position: "top-center",})
        }else{
            toast.error(msg,{position: "top-center",})
        }
    };
    const handleView = (item)=>{
        setModalData(item)
        setModal(true)
    }
    const uploadBg = async(data)=>{
        console.log(modalData)
        const image = {image:data.file[0]}
        const uploadResponse = await axiosPublic.post(image_upload_api,image,{
         headers:{
             'content-type':'multipart/form-data'
         }
         });
         if(uploadResponse.data.success){
            const banner = modalData;
            banner.medicineBgImage= uploadResponse.data.data.display_url;
            console.log(banner)
            useAxiosSecure.post('/banner',banner)
            .then(res=>{
                if(res.data.insertedId){                    
                    setModal(false)
                    setModalData({})
                    console.log(modalData._id)
                    useAxiosSecure.patch(`/bannerrequest/${modalData._id}`,{status:'success'})
                    .then(res=>{
                        if(res.data.modifiedCount > 0){
                            notify(1,"Banner Added Success")
                            refetch();
                        }
                    })

                }
            })
         }
    }
    return (
        <div>

{/* modal */}
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
                        <div className="my-4">
                        {/* <button className="btn bg-red-600 text-white">Rejected </button> */}
                        </div>
                        <div>
                            <form className="" onSubmit={handleSubmit(uploadBg)}>
                                <h1 className="text-green-600 font-semibold mb-2">Add Background Image</h1>
                                <input {...register('file',{
                                    required:"Background Image Required"
                                })} type="file" className="border w-full p-1 rounded-md" /><br></br>
                                {errors.file && <span className="text-red-600">{errors.file.message}</span>}<br></br>
                                <input className="btn btn-success text-white" type="submit" value={"Accept"} />
                            </form>
                        </div>

                                </div>
                            </div>
                        </div>
                       <div>
                       </div>
                    </div>
                </div>
                

                </div>
{/* modal */}



             <SectionTitle title="Banner Request"></SectionTitle>
             <div>
                <table className="table w-full border mt-10">
                   <thead>
                    <tr className="text-sm">
                            <th className=" w-7 text-center">Serial</th>
                            <th className="border text-center">Seller</th>
                            <th className="border text-center">Medicine Name</th>
                            <th className="border text-center">View</th>
                        </tr>
                   </thead>
                   <tbody>
                    {request.map((item,i)=> <tr key={i}>
                        <td className="border">{i+1}</td>
                        <td className="border">{item.seller}</td>
                        <td className="border">{item.medicineName}</td>                       
                        <td className="border"><button className="bg-[#008080] text-center w-full py-2 rounded-md cursor-pointer text-white font-bold" onClick={()=>handleView(item)}>View</button></td>
                    </tr>)}
                    
                   </tbody>
                </table>

             </div>
             <ToastContainer/>
        </div>
    );
};

export default BannerRequest;