const Banner = ({title}) => {
    return (
        <div className='py-10 bg-[#0E1A29]'>
            <div className="container mx-auto px-3 ">
            <h1 className='text-4xl font-bold text-white'>{title}</h1>
            </div>
        </div>
    );
};

export default Banner;