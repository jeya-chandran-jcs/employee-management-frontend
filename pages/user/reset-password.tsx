import React, { useState } from 'react'
import axios from "axios"
import { API } from "../../global"
import Link from "next/link"
import { useRouter } from "next/router"

interface FormData {
    otp: string;
    password: string;
}

const ResetPassword: React.FC = () => {
    const [data, setData] = useState<FormData>({
        otp: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}user/reset-password`, {
                ...data,
                otp: Number(data.otp)
            });
            console.log(response);
            router.push("/user/login")
            setData({
                otp: "",
                password: "",
            });
            setError("");
        }
        catch (err: any) {
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
            [name]: value,
        }));
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg w-100'>
                <p className='text-center text-2xl font-bold font-sans mb-2 bg-blue-200 w-100'>Reset Password</p>

                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div>
                        <label className='block font-medium mb-1 pl-2'>OTP : </label>
                        <input
                            type="number"
                            name="otp"
                            placeholder='Enter your otp here'
                            className='block font-md text-gray-500 w-[90%] mx-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2'
                            value={data.otp}
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

                    <div className='flex justify-between items-center m-4'>
                        <Link href="/user/login"
                            className="no-underline text-md font-semibold text-blue-500 hover:underline hover:text-blue-800 hover:shadow-lg">
                            Login
                        </Link>
                        <button
                            type='submit'
                            className='text-center text-md font-bold border-md shadow-md rounded-lg w-30 
                            h-8 bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-800'
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
