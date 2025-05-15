'use client'

import CardPosts from "../CardPost/CardPost";
import axios from '../../utils/axios'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { CardInt } from "@/types/CardInt";
import Filter from "../Filter/Filter";
import FilterInput from "../FilterInput/FilterInput";

export default function ListPosts() {
    const [posts, setPosts] = useState<CardInt[]>([]);
    const [allPosts, setAllPosts] = useState<CardInt[]>([]);

    const [loading, setLoading] = useState(true);


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
        setAllPosts(res.data)

        } catch (error) {
        console.log(error)
        }
    }

    const filterTasks = async (importance: string) =>{
        console.log(importance)
        if(importance!==""){
        const filtered = allPosts.filter((msg) => msg.importance === importance)
        setPosts(filtered)
        } else {
            setPosts(allPosts)
        }
        
    }

    const filterInput = async (text: string) =>{
        if(text!==""){
             const filtered = allPosts.filter(msg =>
                msg.name.toLowerCase().includes(text.toLowerCase()) ||
                msg.description.toLowerCase().includes(text.toLowerCase())
            )
            setPosts(filtered)
        } else {
            setPosts(allPosts)
        }
    }

    useEffect(() => {
        getPosts()
    }, []);

    return(
        <>
            <Filter onFilter={filterTasks}/>
            <FilterInput onFilterInput={filterInput}/>
            <div className="relative p-8 bg-gray-100 min-h-screen">
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
            </div>
        </>
    )
}