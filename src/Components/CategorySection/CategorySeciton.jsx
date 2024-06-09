import { useQuery } from '@tanstack/react-query';
import useSecure from '../../Hooks/useSecure';
import CategoryCard from '../CategoryCard/CategoryCard';

const CategorySeciton = () => {
    const useAxiosSecure = useSecure();
    const {data:category=[]} = useQuery({
        queryKey:["category"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/category');
            return res.data;
        }
    })
    console.log(category)
    return (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
           {category.map((item,i)=>{ 
            
            return <CategoryCard key={i} item={item}></CategoryCard>
           })}
        </div>
    );
};

export default CategorySeciton;