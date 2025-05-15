'use client'

import CelendarItnr from "@/components/CelendarIntr/CelendarIntr";
import Header from "@/components/Header/Header";
import ListPosts from "@/components/ListPosts/ListPosts";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from '../utils/axios'



export default function Home() {
  const [viewState, setViewState] = useState(true);
  const router = useRouter();

  function isAccessTokenValid(token: string): boolean {
        try {
            const decoded: { exp: number } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    const tokenSearch = async()=>{
        const token = Cookies.get('refreshToken');
        const localToken = localStorage.getItem('accessToken');
        
        if(!token && !localToken){
            console.log('Токен не знайдений');
            router.push('/auth');
        }else if(localToken !== null){
        if(!isAccessTokenValid(localToken)){
            try {
                const res = await axios.get('/auth/refresh',
                {
                    withCredentials: true
                }
                );
                if (res.data.accessToken) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        }
    }
 useEffect(() => {
        tokenSearch()
    }, []);

  return (
   <>
    <Header onViewState={setViewState}/>
    {viewState ? <CelendarItnr /> :
      <>
        <ListPosts />
      </>
     }
   </>
  );
}
