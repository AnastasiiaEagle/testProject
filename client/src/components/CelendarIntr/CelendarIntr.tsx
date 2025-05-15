import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useEffect, useState } from 'react';
import { CardInt } from '@/types/CardInt';
import axios from '../../utils/axios'
import { useRouter } from 'next/navigation';


export default function CelendarItnr() {
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState<any[]>([])
    const router = useRouter()
    

    const getPosts = async () => {
        const id = await axios.get('/auth/me', 
            {
                withCredentials: true
            })
            console.log(id.data)
        try {
        const res = await axios.get('/posts/user',
                {
                    withCredentials: true
                })
        
        const transformed = res.data.map((post: CardInt) => {
            const start = new Date(`${post.date}T${post.time}`)
            const end = new Date(start.getTime() + 60 * 60 * 1000) 

            return {
                id: post.id,
                title: post.name,
                start,
                end,
                allDay: false,
            }
        })

        setEvents(transformed)

        } catch (error) {
            console.log(error)
        }
    }

    const handleEventClick = (event: any) => {
        router.push(`/view/${event.id}`)
    };

    useEffect(()=>{
        getPosts()
    },[])
    
    return(
        <>
           <div className="p-4 h-[500px]">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventClick}
                    style={{ height: '100%' }}
                />
            </div>
        </>
    )
}