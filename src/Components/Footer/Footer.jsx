import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import logo from '../../assets/images/logo.png'

import { IoLocationSharp } from "react-icons/io5";





const Footer = () => {
  return (
    <div className="bg-[#0E1A29] mt-24 print:hidden">
      <div className="container mx-auto px-3">
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-3">
            <div className="col-span-1 space-y-4">
              <div>
                <img src={logo} alt="" />
              </div>
              <div className="text-[#c6c6c6] font-normal">
                <p>
                Unlock collaborative learning potential effortlessly with our footer. Quick links to study tools, group sessions, and support ensure a smooth academic journey. Optimize your study experience with our intuitive interface.
                </p>
              </div>
              <div className="flex gap-4 text-[#fff] text-xl">
                <Link to="https://www.facebook.com">
                    <FaFacebook/>
                </Link>
                <Link to="https://www.twitter.com">
                    <FaTwitter/>
                </Link>
                <Link to="https://www.linkedin.com">
                    <FaLinkedin/>
                </Link>
              </div>
            </div>
            <div className="col-span-1 text-left lg:text-center space-y-8">
            <div className="text-[#008080] text-xl font-normal">
                <h1>Key Links</h1>
              </div>
              <div className="text-[#c6c6c6]">
                <ul className="space-y-2">
                  <li>Event</li>
                  <li>Assignment Rules</li>
                  <li>New Assignment</li>
                  <li>All Assignment</li>                 
                </ul>
              </div>
            </div>
            <div className="col-span-1  text-left lg:text-center space-y-8">
              <div className="text-[#008080] text-xl font-normal">
                <h1>Trems & Condition</h1>
              </div>
              <div className="text-[#c6c6c6] font-normal mt-8">
                <ul className="space-y-2">
                  <li>Terms of Use</li>
                  <li>Privacy Police</li>
                  <li>Contact Support</li>                  
                  <li>FAQs</li>
                </ul>
              </div>
            </div>
            <div className="col-span-1  text-left lg:text-center space-y-8">
            <div className="text-[#008080] text-xl font-normal">
                <h1>Location</h1>
              </div>
              <div className="text-[#c6c6c6] font-normal">
                <ul className="space-y-2 flex justify-center flex-col text-center">
                  <li className='flex justify-start lg:justify-center gap-2 items-center'><IoLocationSharp></IoLocationSharp>Berlin, Germany</li>
                  <li className='flex justify-start lg:justify-center gap-2 items-center'><FaUniversity></FaUniversity>Road no: 7, Building no: 3</li>
                  <li className='flex justify-start lg:justify-center gap-2 items-center'><IoMailOutline></IoMailOutline>support@caracart.com</li>
                  <li className='flex justify-start lg:justify-center gap-2 items-center'><IoCall></IoCall>+89532454</li>
      
                </ul>
              </div>
            </div>
          </div>
          <div className="text-left mt-10 text-[#ABABAB]">
            <span>All Right Reserved By @carecart.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
