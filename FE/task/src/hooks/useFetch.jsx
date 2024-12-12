import axios from "axios";
import { useEffect,useState } from "react";

export default function useFetch(url){
    const[data,setData]=useState(null);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(null);

    async function fetchData(){
        setLoading(true);
        await axios.get(url)
        .then((res)=>{
            setData(res.data);
           
            setLoading(false);
        })
        .catch((err)=>{
            setError(err);
            setLoading(false);
        })
    }
    useEffect(()=>{
        fetchData();
    },[url]);
    return {data,loading,error,fetchData};
}
