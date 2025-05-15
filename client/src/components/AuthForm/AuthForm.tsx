'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';
import axios from '../../utils/axios'

type StateProps = {
    stateAuth: boolean
}

export default function AuthForm({stateAuth}:StateProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const userData = {
            email,
            password,
        };
        console.log(userData)

        try {
            const res = await axios.post('/auth/login', userData, 
            {
                withCredentials: true
            }
            );

            if (res.data.accessToken) {
                localStorage.setItem('accessToken', res.data.accessToken);
            }   

            setEmail('');
            setPassword('');
            setMessage("Вас авторизовано")
            router.push('/')
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                setError(error.response.data?.message || 'Щось пішло не так...');
            } else {
                setError('Помилка при надсиланні');
            }
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const userData = {
            email,
            password,
        };

        try {
            const res = await axios.post('/auth/register', userData, 
            {
                withCredentials: true
            }
            );

            if (res.data.accessToken) {
                localStorage.setItem('accessToken', res.data.accessToken);
            }   

            setEmail('');
            setPassword('');
            setMessage("Реєстрація пройшла успішно")
            router.push('/')
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data?.message || 'Щось пішло не так...');
            } else {
                setError('Помилка при надсиланні');
            }
        }
    };

    return(
            <div className="max-w-sm mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    {stateAuth ? "Вхід" : "Реєстрація"}
                    </h1>
                <form 
                onSubmit={stateAuth ? handleLogin : handleRegister}
                 className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Введіть ваш email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Введіть ваш пароль"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {stateAuth ? "Увійти" : "Зареєструватися"}
                        </button>
                    </div>
                    <div className="mt-4">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                    </div>
                </form>
        </div>
    )
}