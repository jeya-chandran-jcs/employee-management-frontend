import React from "react"
import EmployeeData from "../components/EmployeeData"
import GetTask from "./employee/get-task"
import Cookies from "js-cookie"


const Home: React.FC = () => {
    const userCookie = Cookies.get("user")
    const admin = userCookie ? JSON.parse(userCookie) === "admin" : null
    console.log("admin", admin)



    return (
        <div>
            {admin ? <EmployeeData />
                :
                <GetTask />}
        </div>
    )
}

export default Home