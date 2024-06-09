import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form"
import usePublic from "../../../Hooks/usePublic";
import useSecure from './../../../Hooks/useSecure';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import  Swal  from 'sweetalert2';
import useAuth from "../../../Hooks/useAuth";
const imageHostKey = import.meta.env.VITE_UPLOAD_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
const BannerManage = () => {
    const {user} = useAuth();
    const [modal,setModal] = useState(false);
    const [update,setUpdate] = useState(false);
    const [oldData,setOldData] = useState({});
    const axiosPublic = usePublic();
    const useAxiosSecure = useSecure();
    const [loader,setLoader] = useState(false)
    const notify = (status,msg) => {
        if(status){
            toast.success(msg,{position: "top-center",})
        }else{
            toast.error(msg,{position: "top-center",})
        }
    };
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const {data:banner=[],refetch} = useQuery({
        queryKey:["banner"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/banner');
            return res.data;
        }
    });
      const {data:category=[]} = useQuery({
        queryKey:["category"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/category');
            return res.data;
        }
    });
        const handleAddMedicine = async(data)=>{  
            setLoader(true)
        const image = {image:data.medicineImage[0]}
        const bgImage = {image:data.medicineBgImage[0]}
            const uploadResponse = await axiosPublic.post(image_upload_api,image,{
             headers:{
                 'content-type':'multipart/form-data'
             }
             });
            const uploadBgResponse = await axiosPublic.post(image_upload_api,bgImage,{
             headers:{
                 'content-type':'multipart/form-data'
             }
             });
             if(uploadResponse.data.success && uploadBgResponse.data.success){
                 // console.log(uploadResponse);
                 const medicine = {
                    medicineName: data.medicineName,
                    genericName: data.medicineGeneric,
                    medicineImage: uploadResponse.data.data.display_url,
                    medicineBgImage: uploadBgResponse.data.data.display_url,
                    medicineCategory: data.medicineCategory,
                    medicineCompany: data.medicineCompany,
                    medicineUnit:data.medicineUnit,
                    medicinePrice:data.categoryPrice,
                    medicineDiscount:data.medicineDiscount,
                    medicineDes: data.medicineDes,
                    seller: user?.email
                 }
                //  console.log(medicine)
                 useAxiosSecure.post('/banner',medicine)
                 .then(res=>{
                     if(res.data.insertedId){
                         notify(1,"Added Success")
                         refetch()
                         setLoader(false)
                         setModal(false)
                         reset()
                     }else if(res.data.message === 'already added'){
                         notify(0,"Already Added This Category")
                         setLoader(false)
                     }
                 })
     
             }
      }
      const handleDelete = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                useAxiosSecure.delete(`/banner/${id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });       
      }
      const handleUpdate = (item)=>{
        setOldData(item);
        setUpdate(true);
        setModal(true);
    }      
    const handleUpdateForm = async(data)=>{
        // setLoader(true)
        const photo = data.upmedicineImage;
        const updateBgImg = data.upmedicineBgImage;
        if(photo.length){
            const updatePhoto = {image:data.upmedicineImage[0]}
                const updatePhotoUploadResponse = await axiosPublic.post(image_upload_api,updatePhoto,{
                    headers:{
                        'content-type':'multipart/form-data'
                    }
                   });            
            if(updateBgImg.length){
                const updateBg = {image:data.upmedicineBgImage[0]}
                const updateBgUploadResponse = await axiosPublic.post(image_upload_api,updateBg,{
                    headers:{
                        'content-type':'multipart/form-data'
                    }
                   }); 
                
                const medicine = {
                    medicineName: data.upmedicineName,
                    genericName: data.upmedicineGeneric,
                    medicineImage: updatePhotoUploadResponse.data.data.display_url,
                    medicineBgImage: updateBgUploadResponse.data.data.display_url,
                    medicineCategory: data.upmedicineCategory,
                    medicineCompany: data.upmedicineCompany,
                    medicineUnit:data.upmedicineUnit,
                    medicinePrice:data.upcategoryPrice,
                    medicineDiscount:data.upmedicineDiscount,
                    medicineDes: data.upmedicineDes,
                 }
                 useAxiosSecure.patch(`/banner/${oldData._id}`,medicine)
                 .then(res=>{
                     if(res.data.modifiedCount > 0){
                         notify(1,"Update Success")
                         refetch()
                         reset();
                         setUpdate(false);
                         setModal(false)
                         setLoader(false)
                     }else if(res.data.modifiedCount === 0){
                         notify(0,"No change")
                         console.log(res.data)
                         setLoader(false)
                     }
                     
                 })

            }else{
                const medicine = {
                    medicineName: data.upmedicineName,
                    genericName: data.upmedicineGeneric,
                    medicineImage: updatePhotoUploadResponse.data.data.display_url,
                    medicineBgImage: oldData.medicineBgImage,
                    medicineCategory: data.upmedicineCategory,
                    medicineCompany: data.upmedicineCompany,
                    medicineUnit:data.upmedicineUnit,
                    medicinePrice:data.upcategoryPrice,
                    medicineDiscount:data.upmedicineDiscount,
                    medicineDes: data.upmedicineDes,
                 }
                 useAxiosSecure.patch(`/banner/${oldData._id}`,medicine)
                 .then(res=>{
                     if(res.data.modifiedCount > 0){
                         notify(1,"Update Success")
                         refetch()
                         reset();
                         setUpdate(false);
                         setModal(false)
                         setLoader(false)
                     }else if(res.data.modifiedCount === 0){
                         notify(0,"No change")
                         console.log(res.data)
                         setLoader(false)
                     }
                     
                 })
            }



        }else{

            if(updateBgImg.length){
                const updateBg = {image:data.upmedicineBgImage[0]}
                const updateBgUploadResponse = await axiosPublic.post(image_upload_api,updateBg,{
                    headers:{
                        'content-type':'multipart/form-data'
                    }
                   }); 
                const medicine = {
                    medicineName: data.upmedicineName,
                    genericName: data.upmedicineGeneric,
                    medicineImage: oldData.medicineImage,
                    medicineBgImage: updateBgUploadResponse.data.data.display_url,
                    medicineCategory: data.upmedicineCategory,
                    medicineCompany: data.upmedicineCompany,
                    medicineUnit:data.upmedicineUnit,
                    medicinePrice:data.upcategoryPrice,
                    medicineDiscount:data.upmedicineDiscount,
                    medicineDes: data.upmedicineDes,
                 }
                 useAxiosSecure.patch(`/banner/${oldData._id}`,medicine)
                 .then(res=>{
                     if(res.data.modifiedCount > 0){
                         notify(1,"Update Success")
                         refetch()
                         reset();
                         setUpdate(false);
                         setModal(false)
                         setLoader(false)
                     }else if(res.data.modifiedCount === 0){
                         notify(0,"No change")
                         console.log(res.data)
                         setLoader(false)
                     }
                     
                 })
            }else{
                const medicine = {
                    medicineName: data.upmedicineName,
                    genericName: data.upmedicineGeneric,
                    medicineImage: oldData.medicineImage,
                    medicineBgImage: oldData.medicineBgImage,
                    medicineCategory: data.upmedicineCategory,
                    medicineCompany: data.upmedicineCompany,
                    medicineUnit:data.upmedicineUnit,
                    medicinePrice:data.upcategoryPrice,
                    medicineDiscount:data.upmedicineDiscount,
                    medicineDes: data.upmedicineDes,
                 }
                 useAxiosSecure.patch(`/banner/${oldData._id}`,medicine)
                 .then(res=>{
                     if(res.data.modifiedCount > 0){
                         notify(1,"Update Success")
                         refetch()
                         reset();
                         setUpdate(false);
                         setModal(false)
                         setLoader(false)
                     }else if(res.data.modifiedCount === 0){
                         notify(0,"No change")
                         console.log(res.data)
                         setLoader(false)
                     }
                     
                 })
            }


          
        }      
    }
    return (
        <div>
            {/* modal */}
            <div className={`fixed z-20 ${modal ? 'scale-1 bottom-0 opacity-1' : 'scale-0 opacity-0 bottom-[500px]'} flex justify-center items-center duration-500  left-0 w-full h-full bg-black bg-opacity-50`}>
                <div className="lg:w-[40%] w-[80%] relative rounded-lg bg-white h-auto">
                <div onClick={()=>{
                    setModal(false);
                    reset();
                    setUpdate(false);
                    setOldData({})
                }
                    } className="absolute top-4 right-4 duration-200 hover:bg-[#008080df] bg-[#008080] p-2 text-xl text-white rounded-md cursor-pointer" >
                <IoMdClose />
                </div>   
                    <div className="mt-10 p-10">
                        {update ?  <form onSubmit={handleSubmit(handleUpdateForm)}>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Medicine Name:</h1>
                                    <input defaultValue={oldData.medicineName} {...register('upmedicineName',{
                                        required:"Medicine name required",
                                        pattern:{
                                            value:/^[a-zA-Z0-9\s]+$/,
                                            message:"Only letter and number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Medicine Name" />
                                    {errors.upmedicineName && <span className="text-red-600 text-sm">{errors.upmedicineName.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Generic Name:</h1>
                                    <input defaultValue={oldData.genericName} {...register('upmedicineGeneric',{
                                        required:"Generic required",
                                        pattern:{
                                            value:/^[a-zA-Z0-9\s]+$/,
                                            message:"Only letter and number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Generic" />
                                    {errors.upmedicineGeneric && <span className="text-red-600 text-sm">{errors.upmedicineGeneric.message}</span>}
                                </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Medicine Image:</h1>
                                    <input {...register('upmedicineImage')} type="file" className="border p-1 rounded-md w-full focus:outline-none" />
                                    {errors.upmedicineImage && <span className="text-red-600 text-sm">{errors.upmedicineImage.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category:</h1>
                                    <span className="hidden">{oldData.medicineCategory}</span>
                                    <select defaultValue={oldData.medicineCategory} {...register('upmedicineCategory',{
                                        required:"Category required"
                                    })} className="border p-2 rounded-md w-full focus:outline-none" id="">
                                        <option value="">Select One</option>
                                       {category.map((item,i)=>{
                                        return <option key={i} value={item.categoryName}>{item.categoryName}</option>
                                       })}
                                    </select>
                                    {errors.upmedicineCategory && <span className="text-red-600 text-sm">{errors.upmedicineCategory.message}</span>}
                                </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Mass Unit (Mg)</h1>
                                    <span className="hidden">{oldData.medicineUnit}</span>
                                    <select defaultValue={oldData.medicineUnit} className="border p-2 rounded-md w-full focus:outline-none" id="" {...register('upmedicineUnit',{
                                        required:"Unit required",
                                    })}>
                                        <option value="">Select One</option>
                                        <option value="mg">Mg</option>
                                        <option value="ml">Ml</option>
                                    </select>                                   
                                    {errors.upmedicineUnit && <span className="text-red-600 text-sm">{errors.upmedicineUnit.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Company:</h1>
                                    <span className="hidden">{oldData.medicineCompany}</span>
                                    <select defaultValue={oldData.medicineCompany} {...register('upmedicineCompany',{
                                        required: "Company required"
                                    })} className="border p-2 rounded-md w-full focus:outline-none">
                                        <option value="">Select One</option>
                                        <option value="company 1">Company 1</option>
                                        <option value="company 2">Company 2</option>
                                        <option value="company 3">Company 3</option>
                                    </select>
                                    {errors.upmedicineCompany && <span className="text-red-600 text-sm">{errors.upmedicineCompany.message}</span>}
                                </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Price Per Unit:</h1>
                                    <input defaultValue={oldData.medicinePrice} {...register('upcategoryPrice',{
                                        required:"Price required",
                                        pattern:{
                                            value:/^\d+$/,
                                            message:"Only number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Price" />
                                    {errors.upcategoryPrice && <span className="text-red-600 text-sm">{errors.upcategoryPrice.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Discount (%):</h1>
                                    <input defaultValue={oldData.medicineDiscount} {...register('upmedicineDiscount',{
                                        pattern:{
                                            value:/^\d+$/,
                                            message:"Only number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Discount" />
                                    {errors.upmedicineDiscount && <span className="text-red-600 text-sm">{errors.upmedicineDiscount.message}</span>}
                                </div>
                                    </div>
                                </div>                               
                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Medicine Des:</h1>
                                   <textarea defaultValue={oldData.medicineDes} {...register('upmedicineDes',{
                                    required:"Description required"
                                   })} placeholder="Description" className="border rounded-md p-2 resize-y h-28 w-full focus:outline-none" id=""></textarea>
                                   {errors.upmedicineDes && <span className="text-red-600 text-sm">{errors.upmedicineDes.message}</span>}
                                </div>
                                <div>
                                <h1 className="text-base font-medium">Background Image:</h1>
                                    <input className="border w-full p-2 rounded-md" type="file" {...register('upmedicineBgImage')} />                                     
                                </div>
                                <div className="flex justify-center my-2">
                                    {loader && <span className="loading loading-spinner text-accent"></span>
}
                                </div>
                                <div className="space-y-1">
                                   <input type="submit" value="Update Medicine" className="w-full bg-[#008080] font-medium text-white hover:bg-[#008080df] py-2 rounded-md cursor-pointer" />
                                </div>
                            </div>                             
                        </form> :  <form onSubmit={handleSubmit(handleAddMedicine)}>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Medicine Name:</h1>
                                    <input defaultValue={''} {...register('medicineName',{
                                        required:"Medicine name required",
                                        pattern:{
                                            value:/^[a-zA-Z0-9\s]+$/,
                                            message:"Only letter and number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Medicine Name" />
                                    {errors.medicineName && <span className="text-red-600 text-sm">{errors.medicineName.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Generic Name:</h1>
                                    <input defaultValue={''} {...register('medicineGeneric',{
                                        required:"Generic required",
                                        pattern:{
                                            value:/^[a-zA-Z0-9\s]+$/,
                                            message:"Only letter and number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Generic" />
                                    {errors.medicineGeneric && <span className="text-red-600 text-sm">{errors.medicineGeneric.message}</span>}
                                </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Medicine Image:</h1>
                                    <input defaultValue={''} {...register('medicineImage',{
                                        required:"Image required", 
                                        pattern:{
                                            value: /^[0-9]+$/,
                                            message: "Only Number Allow"
                                        }                                       
                                    })} type="file" className="border p-1 rounded-md w-full focus:outline-none" />
                                    {errors.medicineImage && <span className="text-red-600 text-sm">{errors.medicineImage.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category:</h1>
                                    <select {...register('medicineCategory',{
                                        required:"Category required"
                                    })} className="border p-2 rounded-md w-full focus:outline-none" id="">
                                        <option value="">Select One</option>
                                        {category.map((item,i)=>{
                                        return <option key={i} value={item.categoryName}>{item.categoryName}</option>
                                       })}
                                    </select>
                                    {errors.medicineCategory && <span className="text-red-600 text-sm">{errors.medicineCategory.message}</span>}
                                </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Mass Unit (Mg)</h1>
                                    <select className="border p-2 rounded-md w-full focus:outline-none" id="" {...register('medicineUnit',{
                                        required:"Unit required",
                                    })}>
                                        <option value="">Select One</option>
                                        <option value="mg">Mg</option>
                                        <option value="ml">Ml</option>
                                    </select>                                   
                                    {errors.medicineUnit && <span className="text-red-600 text-sm">{errors.medicineUnit.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Company:</h1>
                                    <select {...register('medicineCompany',{
                                        required: "Company required"
                                    })} className="border p-2 rounded-md w-full focus:outline-none">
                                        <option value="">Select One</option>
                                        <option value="company 1">Company 1</option>
                                        <option value="company 1">Company 2</option>
                                        <option value="company 1">Company 3</option>
                                    </select>
                                    {errors.medicineCompany && <span className="text-red-600 text-sm">{errors.medicineCompany.message}</span>}
                                </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Price Per Unit:</h1>
                                    <input defaultValue={''} {...register('categoryPrice',{
                                        required:"Price required",
                                        pattern:{
                                            value:/^\d+$/,
                                            message:"Only number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Price" />
                                    {errors.categoryPrice && <span className="text-red-600 text-sm">{errors.categoryPrice.message}</span>}
                                </div>
                                    </div>
                                    <div className="flex-1">
                                    <div className="space-y-1">
                                    <h1 className="text-base font-medium">Discount (%):</h1>
                                    <input defaultValue={'0'} {...register('medicineDiscount',{
                                        pattern:{
                                            value:/^\d+$/,
                                            message:"Only number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Discount" />
                                    {errors.medicineDiscount && <span className="text-red-600 text-sm">{errors.medicineDiscount.message}</span>}
                                </div>
                                    </div>
                                </div>                               
                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Medicine Des:</h1>
                                   <textarea defaultValue={''} {...register('medicineDes',{
                                    required:"Description required"
                                   })} placeholder="Description" className="border rounded-md p-2 resize-y h-28 w-full focus:outline-none" id=""></textarea>
                                   {errors.medicineDes && <span className="text-red-600 text-sm">{errors.medicineDes.message}</span>}
                                </div>
                                <div>
                                <h1 className="text-base font-medium">Background Image:</h1>
                                    <input className="border w-full p-2 rounded-md" type="file" {...register('medicineBgImage',{
                                        required:"Bg Image Required"
                                    })} />
                                     {errors.medicineBgImage && <span className="text-red-600 text-sm">{errors.medicineBgImage.message}</span>}
                                </div>
                                <div className="flex justify-center my-2">
                                    {loader && <span className="loading loading-spinner text-accent"></span>
}
                                </div>
                                <div className="space-y-1">
                                   <input type="submit" value="Add Medicine" className="w-full bg-[#008080] font-medium text-white hover:bg-[#008080df] py-2 rounded-md cursor-pointer" />
                                </div>
                            </div>                             
                        </form>}
                       
                    </div>
                </div>
                

                </div>
            
            <SectionTitle title="Banner"></SectionTitle>
            <div>
                <button onClick={()=>setModal(true)} className="border my-3 border-[#008080] hover:bg-[#008080df] p-2 text-white font-medium rounded-md bg-[#008080]">Add Banner</button>
            </div>
            <div>
                {/* category table */}
                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Medicine Name & Image</th>
        <th>Price & Discount</th>
        <th>Company</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>      
      {/* row 4 */}
      {banner.map((item,i)=>{
        return <tr key={i}>
        <th>
         {i + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.medicineImage} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.medicineName}</div>
              <div className="text-sm opacity-50">{item.medicineCategory}</div>
            </div>
          </div>
        </td>
        <td>
          Price:<span className="badge bg-green-500 text-white badge-ghost badge-sm">{item.medicinePrice} TK</span> <br/>
          Unit: <span className="badge bg-blue-500 text-white badge-ghost badge-sm">{item.medicineUnit}</span>
          <br/>
          Discount: <span className="badge bg-warning badge-ghost badge-sm">{item.medicineDiscount}%</span>
        </td>
        <td>{item.medicineCompany}</td>
        <td><button className="btn hover:text-black text-white btn-xs bg-blue-600" onClick={()=>handleUpdate(item)}>Update</button></td>

        <td> <button className="btn bg-error text-white btn-xs hover:text-black" onClick={()=>handleDelete(item._id)}>Delete</button></td>
        
      </tr>
      })}
      
    </tbody>       
  </table>
</div>





            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};
export default BannerManage;