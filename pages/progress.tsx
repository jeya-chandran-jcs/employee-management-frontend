import React, { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../global"
import { useRouter } from "next/router"

interface Props {
  name: string,
  taskTitle: string,
  status: string,
  completionDate: string,
  completionLink: string,
}
const Progress: React.FC = () => {
  const [data, setData] = useState<Props[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const token = Cookies.get("token")
  const admin = Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null

  const getEmployeeStatus = async () => {
    try {
      if (admin === "admin") {
        setLoading(true)
        const response = await axios.get(`${API}task/status`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setData(response.data)
      }
      setLoading(false)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (router.isReady && admin) {

      getEmployeeStatus()
      console.log(data)

    }
  }, [router.isReady, admin])

  return (
    <div className="overflow-x-auto mx-4 my-2">
      <table className="w-full min-w-auto border-collapse  border border-gray-300">
        <thead>
          <tr className="bg-green-500 text-white font-semibold">
            <th className="px-4 py-2 border border-gray-300">S.no</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Task</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
            <th className="px-4 py-2 border border-gray-300">Completion-Link</th>
            <th className="px-4 py-2 border border-gray-300">Completion-Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ?
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            :
            data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 even:bg-gray-50"
                >
                  <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{item.name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{item.taskTitle}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{item.status}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <a
                      href={item.completionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-center"
                    >
                      Link
                    </a>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {new Date(item.completionDate).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : null
          }

        </tbody>
      </table>
    </div>
  )
}

export default Progress