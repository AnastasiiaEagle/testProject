'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '../../utils/axios'
import { useEffect, useState } from 'react';

type HeaderProps = {
    onViewState: (state: boolean) => void
}

export default function Header({onViewState}: HeaderProps) {
    const router = useRouter();
    const [viewState, setViewState] = useState(true);

    const handleExit = async() => {
         try {
            const res = await axios.get('/auth/logout',
            {
                withCredentials: true
            }
            );
            localStorage.removeItem('accessToken');
            router.push('/auth');

        } catch (error: any) {
            console.log(error)
        }
    }

    const handleFormSwitch = (state: boolean) => {
        setViewState(state);
    }
    
    useEffect(()=>{
        onViewState(viewState);
    }, [viewState])

    return(
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4">
                <li>
                    <button onClick={() => handleFormSwitch(true)} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Календар
                    </button>
                </li>
                <li>
                    <button onClick={() => handleFormSwitch(false)} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Список
                    </button>
                </li>
                <li>
                    <Link href="/create">
                        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Запланувати подію
                        </button>
                    </Link>
                </li>
            </ul>
            <button onClick={handleExit} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Вихід
            </button>
        </header>
    )
}