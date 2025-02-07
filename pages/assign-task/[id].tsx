import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { API } from "../../global"
import Cookies from "js-cookie"
interface Props {

    title: string,
    description: string,
}

const AssignTask: React.FC = () => {
    const [data, setData] = useState<Props>({
        title: "",
        description: "",
    })
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()
    const { id, name, department } = router.query
    const token = Cookies.get("token")
    const user = Cookies.get("user")? JSON.parse(Cookies.get("user")as string) : null
    console.log("token", token)


    console.log(department, name)

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/home")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const admin = await user === "admin"
        console.log("admin", admin)
        try {
            if (admin) {
                setLoading(true)
                const response = await axios.post(`${API}task/assign-task`, {
                    assignedTo: id,
                    title: data.title,
                    description: data.description,
                    department: department
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log(response)
                alert("data added")
                router.push("/home")
                setLoading(false)
            }
            else {
                console.log("only admin can add data")
            }
        }
        catch (error) {
            console.error(error)
        }
    }



    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit}
                className="w-[80%] max-w-lg p-6 shadow shadow-lg border border-sm bg-white hover:shadow-gray-400">
                <div className="text-center  flex justify-center items-center gap-10">
                    <p className="text-xl">Assign-Task-To</p>
                    <p className="text-lg text-semibold">{name} From {department}</p>
                </div>

                <div className="mt-4 px-2">
                    <label className="font-semibold text-gray-700 block my-2">Title</label>
                    <input type="text" className="w-[90%] block mx-auto p-2 border border-gray-300
                    rounded-lg focus:ring-2 focus:ring-blue-200 outline-none
                    " placeholder="Enter the Title here" name="title"
                        value={data.title} onChange={handleChange} />
                </div>

                <div className="my-4 px-2">
                    <label className="font-semibold text-gray-700 block my-2">Description</label>
                    <textarea className="w-[90%] p-2 block mx-auto border border-gray-300
                    rounded-lg focus:ring-2 focus:ring-blue-200 outline-none
                    " placeholder="Enter the description here" name="description"
                        value={data.description} onChange={handleChange} />
                </div>

                {loading ? <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    :
                    <div className="flex justify-between items-center mx-8 mb-2">
                        <button className="font-medium text-lg bg-red-400 hover:bg-red-600 transition-all
                border border-red-700 rounded-lg text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-700 
                shadow-md hover:shadow-lg" onClick={handleCancel}>Cancel</button>

                        <button className="font-medium text-lg bg-green-400 hover:bg-green-600 transition-all
                border border-green-700 rounded-lg text-black-900 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-700 
                shadow-md hover:shadow-lg"
                            type="submit">Assign</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default AssignTask