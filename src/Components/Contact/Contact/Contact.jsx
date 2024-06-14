const Contact = () => {
    return (
        <div className='space-y-5'>
            <div className='flex gap-3 justify-between'>
                <div className='flex-1'>
                    <input placeholder='First Name' className='w-full p-2 rounded-md focus:outline-none border' type="text" />
                </div>
                <div className='flex-1'>
                    <input placeholder='Last Name' className='w-full p-2 rounded-md focus:outline-none border' type="text" />
                </div>
            </div>
            <div className='flex gap-3 justify-between'>
                <div className='flex-1'>
                    <input placeholder='Email' className='w-full p-2 rounded-md focus:outline-none border' type="text" />
                </div>
                <div className='flex-1'>
                    <input placeholder='Phone' className='w-full p-2 rounded-md focus:outline-none border' type="number" />
                </div>
            </div>
            <div>
            <input placeholder='Address' className='w-full border p-2 rounded-md focus:outline-none' type="text" />
            </div>
            <div>
           <textarea placeholder='Message' name="" className='w-full p-2 rounded-md focus:outline-none border resize-y h-48' id=""></textarea>
            </div>
            <div>
                <input type="submit" className='w-full font-semibold cursor-pointer rounded-md py-2 bg-[#008080] text-white' />
            </div>
        </div>
    );
};

export default Contact;