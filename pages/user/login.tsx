import React, { useEffect, useState } from 'react'
import axios from "axios"
import { API } from "../../global"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Cookies from 'js-cookie';
import { useRouter } from "next/router"
import Link from "next/link"

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [data, setData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()


    useEffect(() => {
        toast.warning(
            <div>
                <p><b>Admin:</b><br /> admin1@example.com <br /> admin123</p>
                <p><b>Employee:</b><br /> bobbrown@example.com <br /> password123</p>
            </div>
            , {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
    }, [])

    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${API}user/login`, data);
            console.log(response);
            Cookies.set("token", response.data.token, { expires: 1 / 24 })
            Cookies.set("user", JSON.stringify(response.data.user.role), { expires: 1 / 24 })
            console.log(Cookies.get("token"), "\n\n", Cookies.get("user"))
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
            router.push("/home")
            setError("");
            setLoading(false)
        }
        catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
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
                <p className='text-center text-2xl font-bold font-sans mb-2 bg-blue-200 w-100'>Login</p>

                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

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

                    <div className='flex justify-end m-2 mr-2 mb-2'>
                        {loading ?
                            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            :
                            <button
                                type='submit'
                                className='text-center text-md font-bold border-md shadow-md rounded-lg w-30 
                        h-8 bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-800'
                            >
                                Login
                            </button>
                        }
                    </div>
                    <div className="flex justify-between items-center mx-4 mb-3 ">
                        <Link
                            href="/user/register"
                            className="no-underline text-blue-500 hover:text-blue-800 hover:underline text-md font-semibold"

                        >
                            Register!
                        </Link>

                        <Link
                            href="/user/forgot-password"
                            className="no-underline text-blue-500 hover:text-blue-800 hover:underline text-md font-semibold focus:ring focus:ring-blue-300"

                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;
