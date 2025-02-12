import React, { useState, useEffect } from "react"
import { API } from "../global"
import Cookies from "js-cookie"
import Link from "next/link"
import axios from "axios"
import {useSelector} from "react-redux"
import {RootState } from "../redux/store"

interface UserData {
  name: string,
  email: string,
  department: string,
  _id: string,
  role: string
}

interface Status {
  name: string,
  status: string
}

const EmployeeData: React.FC = () => {
  const [data, setData] = useState<UserData[]>([])
  const [status, setStatus] = useState<Status[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  const searchEmployee=useSelector((state:RootState)=>state.employees.searchQuery)
  console.log(searchEmployee,"from employee")


  const token = Cookies.get("token")
  const admin = Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null

  console.log("admin", admin)

  const fetchEmployee = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}task/all-employees`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const filteredRole = response.data.filter((item: UserData) => item.role !== "admin")
      const filteredSearch = filteredRole.filter((employee: UserData) => 
        employee.name.toLowerCase().includes(searchEmployee.toLowerCase()) || 
        employee.department.toLowerCase().includes(searchEmployee.toLowerCase())
      )
      setData(filteredSearch)
      setLoading(false)
    }
    catch (error) {
      console.error("error while fetching employee", error)
    }
  }

  const getEmployeeStatus = async () => {
    try {
      const response = await axios.get(`${API}task/status`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setStatus(response.data)
      console.log(response)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (admin) {
      fetchEmployee()
      getEmployeeStatus()
    }
  }, [admin,searchEmployee])

  const getStatus = (employeeId: string) => {
    const statusEntry = status.find((statusInfo) => statusInfo.name === employeeId)
    return statusEntry ? statusEntry.status : "pending"
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {loading ? (
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      ) : data.length > 0 ? (
        data.map((employee) => (
          <div
            key={employee._id}
            className="bg-white shadow-lg rounded-2xl p-6 w-96 border border-gray-200 hover:shadow-2xl transition-all hover:translate-y-1"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 rounded-t-lg text-lg font-semibold text-center">
              {employee.department}
            </div>

            {/* Body */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold">{employee.name}</h3>
              <p className="text-gray-600">{employee.email}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t pt-3">
              <span className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-300 text-black">
                {getStatus(employee.name)}
              </span>
              <Link
                href={{
                  pathname: `assign-task/${employee._id}`,
                  query: { name: employee.name, department: employee.department },
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition no-underline"
              >
                Assign Task
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No employees found.</p>
      )}
    </div>
  );
}


export default EmployeeData