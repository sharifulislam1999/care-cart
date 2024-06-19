import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form"
import usePublic from "../../../Hooks/usePublic";
import useSecure from './../../../Hooks/useSecure';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import  Swal  from 'sweetalert2';
import { Helmet } from "react-helmet";
const imageHostKey = import.meta.env.VITE_UPLOAD_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
const ManageCategory = () => {
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

      const {data:categories=[],refetch} = useQuery({
        queryKey:["categories"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/category');
            return res.data;
        }
    })
        const handleAddCategory = async(data)=>{  
            setLoader(true)
        const image = {image:data.photo[0]}
            const uploadResponse = await axiosPublic.post(image_upload_api,image,{
             headers:{
                 'content-type':'multipart/form-data'
             }
             });
             if(uploadResponse.data.success){
                 // console.log(uploadResponse);
                 const category = {
                     categoryName: data.categoryname,
                     categoryImg: uploadResponse.data.data.display_url,
                     categoryDes: data.des
                 }
                 useAxiosSecure.post('/category',category)
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
                useAxiosSecure.delete(`/category/${id}`)
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
        setLoader(true)
        const name = data.categoryupdatename;
        const des = data.updatedes;
        const photo = data.updatephoto
        if(photo.length){
        //    console.log("fount")
           const image = {image:data.updatephoto[0]}
           const uploadResponse = await axiosPublic.post(image_upload_api,image,{
            headers:{
                'content-type':'multipart/form-data'
            }
           });
           if(uploadResponse.data.success){
            const updateCategory = {
                 categoryName: name,
                 categoryImg: uploadResponse.data.data.display_url,
                 categoryDes: des
            }
            useAxiosSecure.patch(`/category/${oldData._id}`,updateCategory)
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
                    setLoader(false)
                }
                
            })
           }
        }else{
            const updateCategory = {
                 categoryName: data.categoryupdatename,
                 categoryImg: oldData.categoryImg,
                 categoryDes: data.updatedes
            }
            useAxiosSecure.patch(`/category/${oldData._id}`,updateCategory)
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
                    setLoader(false)
                }
                
            })
        }     
    }

    return (
        <div>
            <Helmet>
                <title>Manage Category</title>
            </Helmet>
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
                        {update ? <form onSubmit={handleSubmit(handleUpdateForm)}>
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category Name:</h1>
                                    <input defaultValue={oldData.categoryName}  {...register('categoryupdatename',{    
                                        required:"Category name required",                                    
                                        pattern:{
                                            value:/^[a-zA-Z0-9\s]+$/,
                                            message:"Only letter and number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Category Name"  />
                                    {errors.categoryupdatename && <span className="text-red-600 text-sm">{errors.categoryupdatename.message}</span>}
                                    
                                </div>

                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category Image:</h1>
                                    {/* <img src={oldData.categoryImg} className="h-20 w-20 object-cover" alt="" /> */}
                                    <input {...register('updatephoto')} type="file" className="border p-2 rounded-md w-full" />
                                    
                                </div>

                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category Desciption:</h1>
                                   <textarea defaultValue={oldData.categoryDes}  {...register('updatedes',{
                                    required:"Description Required"
                                   })} placeholder="Description" className="border rounded-md p-2 resize-y h-28 w-full focus:outline-none" id="" ></textarea>
                                   {errors.updatedes && <span className="text-red-600 text-sm">{errors.updatedes.message}</span>}
                                </div>
                                <div className="flex justify-center my-2">
                                    {loader && <span className="loading loading-spinner text-accent"></span>
}
                                </div>
                                <div className="space-y-1">
                                   <input type="submit" value="Update Category" className="w-full bg-[#008080] font-medium text-white hover:bg-[#008080df] py-2 rounded-md cursor-pointer" />
                                </div>

                            </div>                             
                        </form> :  <form onSubmit={handleSubmit(handleAddCategory)}>
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category Name:</h1>
                                    <input defaultValue={''} {...register('categoryname',{
                                        required:"Category name required",
                                        pattern:{
                                            value:/^[a-zA-Z0-9\s]+$/,
                                            message:"Only letter and number allow"
                                        }
                                    })} type="text" className="border p-2 rounded-md w-full focus:outline-none" placeholder="Category Name" />
                                    {errors.categoryname && <span className="text-red-600 text-sm">{errors.categoryname.message}</span>}
                                </div>

                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category Image:</h1>
                                    <input {...register('photo',{
                                        required:"Category image required"
                                    })} type="file" className="border p-2 rounded-md w-full" />
                                    {errors.photo && <span className="text-red-600 text-sm">{errors.photo.message}</span>}
                                </div>

                                <div className="space-y-1">
                                    <h1 className="text-base font-medium">Category Des:</h1>
                                   <textarea defaultValue={''} {...register('des',{
                                    required:"Description required"
                                   })} placeholder="Description" className="border rounded-md p-2 resize-y h-28 w-full focus:outline-none" id=""></textarea>
                                   {errors.des && <span className="text-red-600 text-sm">{errors.des.message}</span>}
                                </div>
                                <div className="flex justify-center my-2">
                                    {loader && <span className="loading loading-spinner text-accent"></span>
}
                                </div>
                                <div className="space-y-1">
                                   <input type="submit" value="Add Category" className="w-full bg-[#008080] font-medium text-white hover:bg-[#008080df] py-2 rounded-md cursor-pointer" />
                                </div>
                            </div>                             
                        </form>}
                       
                    </div>
                </div>
                

                </div>
            
            <SectionTitle title="Category"></SectionTitle>
            <div>
                <button onClick={()=>setModal(true)} className="border my-3 border-[#008080] hover:bg-[#008080df] p-2 text-white font-medium rounded-md bg-[#008080]">Add Category</button>
            </div>
            <div>
                {/* category table */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>                          
                            <th>Serial</th>
                            <th>Category Image</th>
                            <th>Category Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {categories.map((item,i)=>{
                            return  <tr key={i}>
                            <th>
                                <span>{i+1}</span>                           
                            </th>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.categoryImg} alt="Avatar Tailwind CSS Component" />
                                </div>
                                </div>
                              
                            </div>
                            </td>
                            <td><p className="font-medium">{item.categoryName}</p></td>
                            <td><button className="btn hover:text-black text-white btn-xs bg-blue-600" onClick={()=>handleUpdate(item)}>Update</button></td>
                            <th>
                            <button className="btn bg-error text-white btn-xs hover:text-black" onClick={()=>handleDelete(item._id)}>Delete</button>
                            </th>
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

export default ManageCategory;