import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useRole from './../../Hooks/useRole';
import usePublic from "../../Hooks/usePublic";
import auth from "../../Firebase/firebase.config";
import { ToastContainer, toast } from 'react-toastify';

const ProfileUpdate = () => {
    const {user} = useAuth();
    const [role] = useRole();
    const axiosPublic = usePublic();
    const imageHostKey = import.meta.env.VITE_UPLOAD_KEY;
    const image_upload_api = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues:{
            name:user.displayName
        }
      });
      const notify = (status,msg) => {
        if(status){
            toast.success(msg,{position: "top-center",})
        }else{
            toast.error(msg,{position: "top-center",})
        }
    };
      const updateSubmit = async(data)=>{
        console.log(data)
        if(data.photo.length){
        const image = {image:data.photo[0]}
        const uploadResponse = await axiosPublic.post(image_upload_api,image,{
         headers:{
             'content-type':'multipart/form-data'
         }
         });
         if(uploadResponse.data.success){
            updateProfile(auth.currentUser,{
                displayName: data.name, 
                photoURL: uploadResponse.data.data.display_url
            })
            .then(res=>{
                notify(1,"Updated")
            })
         }

        }else{
            updateProfile(auth.currentUser,{
                displayName: data.name                
            })
            .then(res=>{
                notify(1,"Updated")
            })
        }
       
        // updateProfile()
        
      }
    return (
        <div className="container mx-auto px-3">
            <div className="mt-20 items-center flex-col lg:flex-row flex gap-6">
            <div className="flex-1 flex gap-3 flex-col items-center">
                <div className="text-2xl  font-semibold">
                    <h1>Name: {user.displayName}</h1>
                </div>
                <div className="h-40 w-40">
                    <img className="w-full h-full rounded-full border-4 border-[#008080]" src={user.photoURL} alt="" />
                </div>
                <div className="text-lg capitalize">
                    <h1>Role: {role}</h1>
                </div>
            </div>
            <div className="flex-1">
                <div>
                    <form className="space-y-2" onSubmit={handleSubmit(updateSubmit)}>
                        <div className="space-y-1">
                            <div>
                                <h1 className="font-medium">Name</h1>
                            </div>
                            <div>
                                <input {...register('name',{
                                    required:"Name is required",
                                    pattern:{
                                        value: /^[A-Za-z\s]+$/,
                                        message:"only letter and white space allow"
                                    }
                                })} type="text" className="border w-full p-2 rounded-md focus:outline-none" placeholder="Name"/>
                                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            </div>
                        </div>
                       <div>
                            <div>
                                <h1 className="font-medium">Email</h1>
                            </div>
                            <div>
                                <input defaultValue={user.email} disabled type="text" className="border w-full p-2 rounded-md focus:outline-none" placeholder="email"/>
                            </div>
                        </div>
                       <div>
                            <div>
                                <h1 className="font-medium">Photo</h1>
                            </div>
                            <div>
                                <input {...register('photo')} type="file" className="border w-full p-2 cursor-pointer rounded-md focus:outline-none"/>
                            </div>
                        </div>                     
                        <div>
                            <input type="submit" value="Update Profile" className="border w-full mt-5 bg-[#008080] text-white py-1 cursor-pointer rounded-md font-semibold" />
                        </div>
                    </form>
                </div>


            </div>
            
        </div>
        <ToastContainer/>
        </div>
    );
};

export default ProfileUpdate;