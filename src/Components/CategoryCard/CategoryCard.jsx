import { FaSitemap } from "react-icons/fa";
import useSecure from "../../Hooks/useSecure";
import { useQuery } from "@tanstack/react-query";
import {useNavigate } from "react-router-dom";

const CategoryCard = ({ item }) => {
  const { categoryName, categoryImg, categoryDes } = item;
  const useAxiosSecure = useSecure();
  const navigate = useNavigate();
  const { data: count = 0 } = useQuery({
    queryKey: ["count", categoryName],
    queryFn: async () => {
      const res = await useAxiosSecure.get(`/categorycount/${categoryName}`);
      return res.data;
    },
  });
  const goDetails = ()=>{
    navigate(`/category/${categoryName}`) 
  }
  console.log(count);
  return (
    <div onClick={goDetails} className="border rounded-xl scale-100 hover:scale-[101%] duration-200 cursor-pointer space-y-2">
      <div className="h-60">
        <img
          className="w-full rounded-t-md  cursor-pointer h-full object-cover"
          src={categoryImg}
          alt=""
        />
      </div>
      <div className="p-3">
        <div className="text-xl font-bold">
          <h1>{categoryName}</h1>
        </div>
        <div className="text-md text-[#838282cb]">
          <h1>{categoryDes}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-[#008080]">
            <FaSitemap />
          </div>
          <div className="font-bold">
            <h1>{count.count}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
