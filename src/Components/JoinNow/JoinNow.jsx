import joinImg from "../../assets/images/join.png";
import { Link } from 'react-router-dom';
import { RiTeamFill } from "react-icons/ri";
const JoinNow = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between items-center gap-3'>
            <div className='flex-1'>
                <div className="flex justify-center">
                    <div className="relative">
                    <img className="z-20" src={joinImg} alt="" />                    
                    </div>                    
                </div>
            </div>
            <div className='flex-1'>
                <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                    <RiTeamFill className="text-[#008080]"></RiTeamFill>
                        <h1 className="font-medium">Join As A Seller</h1>
                    </div>
                    <div className=" text-3xl md:text-5xl font-semibold leading-snug text-[#008080]">
                        <h1>Join Us Become an Instructor & Top Rated Seller</h1>
                    </div> 
                    <div className="text-md text-[#757676c5] font-medium">
                        <p>As an instructor with us, you`ll have the opportunity to inspire, guide, and mentor our diverse community of students. Whether you`re an industry expert, an academic guru, or an experienced professional</p>
                    </div>
                    <div>
                        <Link to="/login" className="py-2 mt-3 inline-block hover:bg-transparent border-2 border-[#008080]  px-4 hover:text-black duration-200 font-semibold rounded-md text-white bg-[#008080]">Join Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinNow;