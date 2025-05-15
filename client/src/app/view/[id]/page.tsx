'use client'

import ViewInfoCard from "@/components/ViewInfoCard/ViewInfoCard";
import { CardInt } from "@/types/CardInt";
import { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { useParams, useRouter } from "next/navigation";


export default function View() {
    const [card, setCard] = useState<CardInt>();
    const [loading, setLoading] = useState(true);

    const router = useRouter()
    const params = useParams()
    const id = params.id

    const getPostId = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/posts/${id}`, 
                        {
                            withCredentials: true
                        });
                
                setLoading(false)
                setCard(res.data)
            } catch (error) {
            console.log(error)
            }
    }

    const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${id}`, 
            {
                withCredentials: true
            });

      if (res.status !== 200) {
        console.error('Не вдалося видалити повідомлення')
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error)
    }}

    useEffect(()=>{
        console.log(card)
    },[card])
    useEffect(()=>{
        getPostId()
    },[id])

    return(
        <>
        {card && 
            <ViewInfoCard
                name={card.name}
                description={card.description}
                date={card.date}
                time={card.time}
                importance={card.importance}
                onDelete={() => handleDelete()}
                onEdit={() => router.push(`/update/${id}`)}
            />
        }
        </>
    )
}