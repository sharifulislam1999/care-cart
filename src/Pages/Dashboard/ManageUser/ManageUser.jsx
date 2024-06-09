import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../Hooks/useSecure";
import Swal from 'sweetalert2'
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
const ManageUser = () => {
    const useAxiosSecure = useSecure();
    const {data:users=[],refetch} = useQuery({
        queryKey:["users"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/user');
            return res.data;
        }
    })
    const handleChange = (e,id)=>{        
        Swal.fire({
            title: "Are you sure?",
            text: `Make this user as a ${e.target.value}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008080",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
            useAxiosSecure.patch(`/user/${id}/${e.target.value}`)
            .then(res=>{
                if(res.data.modifiedCount > 0){ 
                    refetch();
                    Swal.fire({
                        title: "Changed",
                        text: `User role changed to ${e.target.value}`,
                        icon: "success"
                      });   
                }
            })
            }else{
            //  
            }
          });
    }
    const handleDelete = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                useAxiosSecure.delete(`/user/${id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });
    }

    return (
        <div>
          <SectionTitle title="Users"></SectionTitle>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="">
        <th>Serial</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {users.map((item,i)=>{
            return <tr key={i}>
             <td>
              <span>{i +1}</span>
             </td>
             <td>
              <span>{item.email}</span>
             </td>
             <td>        
                 <span className={`text-white px-2 py-1 rounded-full 
                 ${item.role === "admin" && 'bg-blue-600 '}
                 ${item.role === "seller" && 'bg-green-600 '}
                 ${item.role === "user" && 'bg-[#008080] '}`}>                                     
                    {item.role}
                    </span>         
             </td>
             <td>
                <select className="border" defaultValue={item.role} onChange={(e)=>{handleChange(e,item._id,)}}>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                </select>
             </td>
             <th>
               <button className="btn bg-error text-white btn-xs" onClick={()=>handleDelete(item._id)}>Delete</button>
             </th>
           </tr>

        })}



      {/* row 1 */}
     
     
    </tbody>
    
  </table>
</div>
            </div>
            






            
        </div>
    );
};

export default ManageUser;