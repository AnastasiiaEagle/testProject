'use client'

import { jwtDecode } from "jwt-decode";
import CardPosts from "../CardPost/CardPost";
import Cookies from 'js-cookie';
import axios from '../../utils/axios'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { CardInt } from "@/types/CardInt";


export default function ListPosts() {
    const [posts, setPosts] = useState<CardInt[]>([]);
    const [loading, setLoading] = useState(true);
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

    const getPosts = async () => {
        setLoading(true)

        const id = await axios.get('/auth/me', 
            {
                withCredentials: true
            })
            console.log(id.data)
        try {
        const res = await axios.get('/posts/user',
                {
                    withCredentials: true
                });
        
        setLoading(false)
        setPosts(res.data)

        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        tokenSearch();
        getPosts();
    }, []);

    return(
        <>
            <div className="w-full flex flex-col items-center px-4 pt-5">
                <div className="w-full max-w-3xl">
                    {Array.isArray(posts) ? posts.map((post) => (
                        <CardPosts
                            key={post.id}
                            id={post.id}
                            name={post.name}
                            date={post.date}
                            time={post.time}
                            importance={post.importance}
                            />
                    )): "Список порожній =("}
                </div>
            </div>
        </>
    )
}