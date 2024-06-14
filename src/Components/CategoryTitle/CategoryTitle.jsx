const CategoryTitle = ({title}) => {
    return (
        <div className="my-28 flex flex-col items-center gap-3">
            <h1 className="text-4xl font-bold text-center text-[#008080]">{title}</h1>
            <div className=" w-full lg:w-2/4 text-center">
            <p className="text-md text-[#838282cb]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perspiciatis magni, totam voluptas quae voluptatum libero quo vero, dolorem optio beatae eum laudantium molestiae. Ut.</p>
            </div>
        </div>
    );
};

export default CategoryTitle;