const CategoryTitle = ({title,des}) => {
    return (
        <div className="my-28 flex flex-col items-center gap-3">
            <h1 className="text-4xl font-bold text-center text-[#008080]">{title}</h1>
            <div className=" w-full lg:w-2/4 text-center">
            <p className="text-md text-[#838282cb]">{des}</p>
            </div>
        </div>
    );
};

export default CategoryTitle;