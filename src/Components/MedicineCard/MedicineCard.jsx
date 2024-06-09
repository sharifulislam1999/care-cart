import { TbCategory } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { CgPathUnite } from "react-icons/cg";




const MedicineCard = ({item}) => {
    const {genericName,
        medicineCategory,
        medicineCompany,
        medicineDes,
        medicineDiscount,
        medicineImage,
        medicineName,
        medicinePrice,
        medicineUnit,
        seller} = item;
    return (
        <div className='p-2 border'>
            <div className='h-52 relative'>
                <img className='h-full w-full object-cover' src={medicineImage} alt="" />
                <div className='absolute top-2 left-2 py-1 text-sm rounded-full text-white font-medium px-3 bg-[#008080]'>
                    <span>{genericName}</span>
                </div>
                {medicineDiscount !== "0" && <div className='absolute top-10 left-2 py-1 text-sm rounded-full text-white font-medium px-3 bg-red-700'>
                    <span>{medicineDiscount} % off</span>
                </div>}
            </div>
            <div>
                <h1 className='text-xl font-medium'>{medicineName}</h1>
            </div>
            <div>
            {medicineDiscount !== "0" ?
                 <>
                 <div className='text-sm text-red-600 font-bold'>
                    <del>Regular: {medicinePrice} Tk</del>
                </div>
                <div className='text-2xl font-bold text-[#008080]'>
                    <h1>Price: {medicinePrice - ((medicinePrice * medicineDiscount) / 100)}</h1>
                </div>
                </>:  <div className='text-2xl font-bold text-[#008080]'>
                    <h1>Price: {medicinePrice}</h1>
                </div>
                
                }
            </div>
            <div className='flex gap-2 flex-wrap'>
                <h1 className='flex bg-[#008080] px-2 rounded-full text-sm text-white items-center gap-1'><TbCategory />
                {medicineCategory}</h1>
                <h1 className='flex bg-[#008080] px-2 rounded-full text-sm text-white items-center gap-1'><BsBuildings />{medicineCompany}</h1>
                <h1 className='flex bg-[#008080] px-2 rounded-full text-sm text-white items-center gap-1'><CgPathUnite />{medicineUnit}</h1>
            </div>
            <div>
                <span>{medicineDes}</span>
            </div>
            <div>
                <div>
                    <button>View Details</button>
                    <button>View Details</button>
                </div>
            </div>
        </div>
    );
};

export default MedicineCard;



