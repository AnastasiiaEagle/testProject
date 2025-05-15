import { useEffect, useState } from "react";

import axios from '../../utils/axios'
import { useParams, useRouter  } from "next/navigation";
import { CardInt } from "@/types/CardInt";

type PostFormProps = {
    onState: boolean
}


export default function PostForm({onState}:PostFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [importance, setImportance] = useState('')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter()
    const params = useParams()
    const id = params.id

     const handleCreatee = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const id = await axios.get('/auth/me', 
            {
                withCredentials: true
            })
            console.log(id.data)
        if(id){
            const postData = {
                name,
                description,
                date,
                time,
                importance,
                userId: id.data
            }

            try {
                const res = await axios.post('/posts', postData, 
                {
                    withCredentials: true
                })

                setSuccess('Дані надіслано');
                setName('');
                setDescription('');
                setDate('')
                setTime('')
                setImportance('')
                setLoading(false)
            } catch (error: any) {
                console.log(error)
                if (error.response) {
                    setError(error.response.data?.message || 'Щось пішло не так...');
                } else {
                    setError('Помилка при надсиланні');
                }
            }
        }else{
            setError('Виникла помилка користувача');
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        const postData = {
            name,
            description,
            date,
            time,
            importance,
        }

        try {
            const res = await axios.patch(`/posts/${id}`, postData, 
            {
                withCredentials: true
            })

            setSuccess('Дані оновлено');
            setName('');
            setDescription('');
            setDate('')
            setTime('')
            setImportance('')
            setLoading(false)

            if(res.status === 200){
                router.push(`/view/${id}`);
            }
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                setError(error.response.data?.message || 'Щось пішло не так...');
            } else {
                setError('Помилка при надсиланні');
            }
        }
    }

    useEffect(()=>{
        if(!onState){
            const getPostId = async () => {
                setLoading(true)
                try {
                    const res = await axios.get(`/posts/${id}`, 
                            {
                                withCredentials: true
                            });
                    
                    setLoading(false)
                    setName(res.data.name);
                    setDescription(res.data.description);
                    setDate(res.data.date)
                    setTime(res.data.time)
                    setImportance(res.data.importance)
                } catch (error) {
                console.log(error)
                }
            }
            getPostId()
        }
    },[])



    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="space-y-4 p-6 border rounded-lg shadow-lg bg-white w-full max-w-lg"
                onSubmit={onState ? handleCreatee : handleUpdate}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {onState ? "Запланувати подію" : "Редагувати подію"}
                    </h2>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва:</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опис:</label>
                <textarea
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    required
                />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата події:</label>
                    <input
                        type="date"
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Час події:</label>
                    <input
                        type="time"
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Важливість:</label>
                <select
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={importance}
                    onChange={e => setImportance(e.target.value)}
                    required
                >
                    <option value="">Оберіть важливість</option>
                    <option value="CRITICAL">Критична</option>
                    <option value="NORMAL">Звичайна</option>
                    <option value="IMPORTANT">Важлива</option>
                </select>
                </div>

                <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled={loading}
                >
                {loading ? "Зачекайте..." : onState ? "Створити" : "Редагувати"}
                </button>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    )
}