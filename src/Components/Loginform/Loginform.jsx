import { useState } from "react";
import LoginBanner from "../../assets/images/loginbanner.jpg"
import googleImg from "../../assets/images/icons/google.png"
import FaceBookImg from "../../assets/images/icons/facebook.jpg"
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { TbSelector } from "react-icons/tb";
import { useForm } from "react-hook-form"
import useAuth from './../../Hooks/useAuth';
import { updateProfile } from "firebase/auth";
import usePublic from "../../Hooks/usePublic";
import auth from "../../Firebase/firebase.config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Loginform = () => {
    const [loginToggle,setLoginToggle] = useState(true);
    const {signUp,popSign,signIn} = useAuth();
    const axiosPublic = usePublic();
    const [submitLoading,setSubmitLogin] = useState(false)
    const [loginError,setLoginError] = useState({});
    const imageHostKey = import.meta.env.VITE_UPLOAD_KEY;
    const image_upload_api = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    const navigate = useNavigate();
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
      const handleSignup = async(data) => {
        setSubmitLogin(true);
        const image = {image:data.image[0]}
        const uploadResponse = await axiosPublic.post(image_upload_api,image,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
        if(uploadResponse.data.success){
            // console.log(uploadResponse.data)
            signUp(data.email,data.password)
            .then((res) =>{
                updateProfile(auth.currentUser,{
                    displayName:data.username,
                    photoURL:uploadResponse.data.data.display_url
                })
                .then(()=>{
                    const user = {
                        email: res.user.email,
                        role: data.role
                    }
                    axiosPublic.post('/users',user)
                    .then(res=>{
                        navigate('/')
                        console.log(res.data);
                        if(res.data.insertedId){
                            reset();
                            setSubmitLogin(false)
                            notify(1,'User create success')
                        }
                    })
                })
        
            })
            .catch(err =>{
                if(err.code === "auth/email-already-in-use"){
                    notify(0,'Email Already Use')
                }
            })
        }      
      }
      const googleSignIn = ()=>{
        popSign('google')
        .then(res=>{
            if(res.user){
                const user = {
                    email: res.user?.email,
                    role: "user",
                }
                axiosPublic.post('/users',user)
                    .then(res=>{
                        navigate('/')
                        console.log(res.data);
                        if(res.data.insertedId){
                            setSubmitLogin(false)
                            reset()
                            notify(1,'User create success')
                        }
                    })
            }
        })
      }
      const facebookSignIn = ()=>{
        popSign('facebook')
        .then(res=>{
            if(res.user){
                const user = {
                    email: res.user?.email,
                    role: "user",
                }
                axiosPublic.post('/users',user)
                    .then(res=>{
                        navigate('/')
                        console.log(res.data);
                        if(res.data.insertedId){
                            setSubmitLogin(false)
                            notify(1,'User create success')
                        }
                    })
            }
        })
        
      }
      const handleSignIn = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(email === ""){
            setLoginError({password: loginError?.password || "" ,email: "Email Required"})
            return;
        }else if(password === ""){
            setLoginError({email: loginError?.email || "",password: "Password Required"})
            return;
        }else{
            setLoginError({})
        }
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if(!pattern.test(password)){
            setLoginError({email: loginError?.email || "",password: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."})
            return;
        }
        signIn(email,password)
        .then(res=>{
            navigate('/')
            console.log(res.user)
            notify(1,"Sign in success")
            e.target.reset();
        })
        .catch(err=>{
            if(err.code === "auth/invalid-credential"){
                notify(0,"Invalid email or password")
            }
        })
        


      }
    return (
        <div className='flex gap-8 lg:flex-row flex-col-reverse flex-wrap'>
            <div className="flex-1  relative">
                <div>
                    <img src={LoginBanner} className="w-full h-[800px] object-cover rounded-lg" alt="" />
                </div>
                <div className="w-full h-full absolute rounded-lg top-0 left-0 bg-gradient-to-t from-[#008080] ">
                </div>
            </div>
            <div className="flex-1">
                <div className="lg:p-10 flex justify-center">
                    <div className="h-12 w-48 rounded-full bg-[#0080803a] relative p-1">
                        <div onClick={()=>setLoginToggle(!loginToggle)} className={`h-[68%]  cursor-pointer top-2 ${loginToggle ? "left-2" : "right-2"} absolute w-1/2 bg-[#008080] duration-300 rounded-full text-white flex justify-center items-center`}>
                            <h1>{!loginToggle ? "Sign In" : "Sign Up"}</h1>
                        </div>
                    </div>
                </div>
                <div className="lg:px-10 relative">
                    <div className="flex overflow-x-hidden">
                        {loginToggle ? 
                        <div className="min-w-full">
                            <div className="text-center mb-4 text-3xl font-semibold">
                                <h1>Sign In</h1>
                            </div>
                            <div className="space-y-3">
                                <div className="flex py-1 rounded-md cursor-pointer justify-center border" onClick={googleSignIn}>
                                    <div className="flex items-center gap-2">
                                    <img className="w-8" src={googleImg} alt="" />
                                    <h1>Continue With Google</h1>
                                    </div>
                                </div>
                                <div className="flex py-1 rounded-md cursor-pointer justify-center border" onClick={facebookSignIn}>
                                    <div className="flex items-center gap-2">
                                    <img className="w-8" src={FaceBookImg} alt="" />
                                    <h1>Continue With Facebook</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-5 text-2xl font-bold">
                                Or
                            </div>
                            <form className="mt-5 space-y-4" onSubmit={handleSignIn}>
                                <div className="space-y-1 ">
                                    <h1 className="text-mg font-medium">Email</h1>
                                    <div className="relative">
                                    <input type="email" name="email" className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" placeholder="Email"/>
                                    <div className="absolute top-0 text-xl h-full flex justify-center items-center w-[28px]">
                                        <MdEmail/>
                                    </div>
                                    {loginError?.email && <p  className="text-red-600 text-sm absolute">{loginError?.email}</p>}
                                    </div>
                                    </div>
                                <div className="space-y-1">
                                <h1 className="text-md font-medium">Password</h1>
                                <div className="relative">
                                    <input type="password" name="password" className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" placeholder="Password"/>
                                    <div className="absolute top-0 text-xl h-full flex justify-center items-center w-[28px]">
                                        <RiLockPasswordFill/>
                                    </div>
                                    {loginError?.password && <p  className="text-red-600 text-sm absolute">{loginError?.password}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input type="submit" className="w-full mt-6 cursor-pointer font-medium rounded-md bg-[#008080] py-2 text-white " value="Sign In" />
                                </div>
                            </form>
                        </div> :
                        <div className="min-w-full">
                        <div className="text-center mb-4 text-3xl font-semibold">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="space-y-3">
                            <div className="flex py-1 rounded-md cursor-pointer justify-center border" onClick={googleSignIn}>
                                <div className="flex items-center gap-2">
                                <img className="w-8" src={googleImg} alt="" />
                                <h1>Continue With Google</h1>
                                </div>
                            </div>
                            <div className="flex py-1 rounded-md cursor-pointer justify-center border" onClick={facebookSignIn}>
                                <div className="flex items-center gap-2">
                                <img className="w-8" src={FaceBookImg} alt="" />
                                <h1>Continue With Facebook</h1>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5 text-2xl font-bold">
                            Or
                        </div>
                        <form className="mt-5 space-y-4" onSubmit={handleSubmit(handleSignup)}>
                            <div className="space-y-1 ">
                                <h1 className="text-mg font-medium">Username</h1>
                                <div className="relative">
                                <input {...register("username",{
                                    required:{
                                        value:true,
                                        message:'Required'
                                    },
                                    pattern:{
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Name can only contain letters and whitespace'
                        
                                    }
                                })} type="text" className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" placeholder="Username" />
                                <div className="absolute top-0 left-1 text-xl h-full flex justify-center items-center w-[28px]">
                                    <FaUser/>
                                </div>
                                {errors.username && <p className="text-red-600 text-sm absolute font-normal">{errors.username.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-1 ">
                                <h1 className="text-mg font-medium">Email</h1>
                                <div className="relative">
                                <input {...register('email',{
                                    required: 'Email is required',
                                    pattern: {
                                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                      message: 'Email is not valid'
                                    }
                                })} type="email" className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" placeholder="Email" />
                                <div className="absolute top-0 left-1 text-xl h-full flex justify-center items-center w-[28px]">
                                    <MdEmail/>
                                </div>
                                {errors.email && <p className="text-red-600 text-sm absolute">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-1 ">
                                <h1 className="text-mg font-medium">Photo</h1>
                                <div className="relative">
                                <input {...register('image',{
                                     required: 'Image is required',
                                })} type="file" className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" placeholder="Email" />
                                <div className="absolute top-0 left-1  text-xl h-full flex justify-center items-center w-[28px]">
                                    <MdEmail/>
                                </div>
                                {errors.image && <p className="text-red-600 text-sm absolute">{errors.image.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-1 ">
                                <h1 className="text-mg font-medium">Role</h1>
                                <div className="relative">
                                <select name="" {...register('role')} className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" id="" >
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                                <div className="absolute top-0 left-1 text-xl h-full flex justify-center items-center w-[28px]">
                                    <TbSelector/>
                                </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                            <h1 className="text-md font-medium">Password</h1>
                            <div className="relative">
                                <input {...register('password',{
                                    required:"Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
                                      }

                                })} type="password" className="border text-[#545252e8] w-full py-2 px-8 focus:outline-none rounded-md" placeholder="Password"/>
                                <div className="absolute top-0 left-1 text-xl h-full flex justify-center items-center w-[28px]">
                                    <RiLockPasswordFill/>
                                </div>
                                {errors.password && <p className="text-red-600 text-sm absolute">{errors.password.message}</p>}
                                </div>
                            </div>
                            
                            {submitLoading && <div className="flex justify-center">
                            <span className="loading loading-spinner text-accent"></span>
                            </div> }
                            <div>
                                <input type="submit" className="w-full cursor-pointer font-medium mt-6 rounded-md bg-[#008080] py-2 text-white " value="Sign Up" />
                            </div>
                        </form>



                    </div>
                     }
                        
                        

                    </div>                   

                </div>
                
            </div>
                    <ToastContainer></ToastContainer>
        </div>
    );
};

export default Loginform;