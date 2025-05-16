import { useEffect } from 'react';
import { ApiClient } from '@/lib/api-client';

export default function BirthdayWidget()  {


    const apiClient = new ApiClient()

    useEffect(() => {
        apiClient.get("api/birthdays").then((res)=> console.log(res))
    }, []);



    return (
        <></>
    )
}