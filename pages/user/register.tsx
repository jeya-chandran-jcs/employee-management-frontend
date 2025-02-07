import React, { useState } from 'react'
import axios from "axios"
import { API } from "../../global"
import { useRouter } from 'next/navigation'
import Link from "next/link"

interface FormData {
    name: string;
    email: string;
    password: string;
    department: string;
}

const Register: React.FC = () => {
    const [data, setData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        department: ""
    });
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<string>("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${API}user/register`, data);
            console.log(response);
            setData({
                name: "",
                email: "",
                password: "",
                department: ""
            });
            setLoading(false)
            router.push('/user/login')
            setError("");
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong while registering");
            }
            console.log(err);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg w-100'>
                <p className='text-center text-2xl font-bold font-sans mb-2 bg-blue-200 w-100'>Register</p>

                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className=' '>
                        <label className='block font-medium mb-1 pl-2'>Name : </label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name here'
                            className='block font-md text-gray-500 w-[90%] mx-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 px-2'
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='block font-medium mb-1 pl-2'>Email : </label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email here'
                            className='block font-md text-gray-500 w-[90%] mx-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2'
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='block font-medium mb-1 pl-2'>Password : </label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter your password here'
                            className='block font-md text-gray-500 w-[90%] mx-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2'
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='block font-medium mb-1 pl-2'>Department : </label>
                        <input
                            type="text"
                            name="department"
                            placeholder='Enter your department here'
                            className='block font-md text-gray-500 w-[90%] mx-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2'
                            value={data.department}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-between items-center m-4'>
                        <Link href="/user/login"
                            className="no-underline text-md font-semibold text-blue-500 hover:underline hover:text-blue-800 hover:shadow-lg">
                            Login
                        </Link>

                        {loading ?
                            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            :
                            <button
                                type='submit'
                                className='text-center text-md font-bold border-md shadow-md rounded-lg w-30 
                            h-8 bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-800'
                            >
                                Register
                            </button>
                        }

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
