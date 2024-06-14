import { useQuery } from '@tanstack/react-query';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import useSecure from '../../../Hooks/useSecure';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const SalesReport = () => {
    const tableRef = useRef(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState();
    const useAxiosSecure = useSecure();
    const {data:sales = [],refetch}= useQuery({
        queryKey: ["sales"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/salesreport?start=${startDate}&endDate=${endDate}`)
            return res.data;
        }
    });
    useEffect(()=>{
        if(startDate && endDate){
            refetch()
        }


    },[startDate,endDate])
    return (
        <div>
            <SectionTitle title={"Sales Report"}></SectionTitle>
            <div className='my-5 flex gap-2 items-center'>
            <DatePicker className='border focus:outline-none p-1 rounded-md' placeholderText='Start Date'  dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                <h1 className='font-semibold'>TO</h1>
                <DatePicker className='border focus:outline-none p-1 rounded-md' placeholderText='End Date'  dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            <div className='overflow-x-auto'>
            <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button className='btn bg-[#008080] text-white btn-sm'> Export excel </button>

                </DownloadTableExcel>
                <table className='table' ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Seller Email</th>
                            <th>Buyer Email</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((item,i)=><tr key={i}>
                            <td>{i+1}</td>                              
                            <td>{item.seller}</td>                            
                            <td>{item.user}</td>                            
                            <td>{item.price} TK</td>                            

                            </tr> )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;