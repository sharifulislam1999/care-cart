import useAuth from "../Hooks/useAuth";
const DashboardNav = () => {

    const {user} = useAuth();
    return (
        <div className="pr-10 border-b py-1">
            <div className='flex justify-end'>
                <div>
                    <img className="h-10 w-10 rounded-full border-2 border-[#008080]" src={user.photoURL} alt="" />                   
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;