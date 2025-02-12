import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router"
import { useSelector,useDispatch } from "react-redux"
import {setSearchQuery} from "../redux/feature/searchSlice"
import {RootState} from "../redux/store"

const Navbar: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()
  const dispatch=useDispatch()
  const searchEmployee=useSelector((state:RootState)=>state.employees.searchQuery)
  
  useEffect(() => {
    setIsClient(true);
    const userRole = Cookies.get("user");
    setToken(Cookies.get("token") || null);
    if (userRole) {
      const parsedUser = JSON.parse(userRole)
      setAdmin(parsedUser === "admin")
    }
    else {
      setAdmin(false)
    }
  },);
  // console.log("from nav", admin, "\n", token)

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {

    e.preventDefault()
    Cookies.remove("token")
    Cookies.remove("user")
    alert("successfully log out")
    router.push("/user/login")
  }

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    dispatch(setSearchQuery(e.target.value))
    console.log(searchEmployee)
  }

  if (!isClient) return null;
  return (
    <nav className="flex justify-between items-center bg-blue-600 z-10 text-white px-4 py-2 shadow-lg  top-0">
      <div>
        {admin ? (
          <div className="flex items-center gap-3">
            <Link href="/home" className="cursor-pointer hover:underline hover:text-yellow-200 text-lg font-semibold" >
              <i className="fa-solid fa-house"></i>
            </Link>
            <Link
              href="/progress"
              className="no-underline text-lg font-semibold hover:underline hover:text-yellow-200" >
              Work Progress
            </Link>
          </div>
        ) : (
          <p className="text-lg font-semibold">Employee Management System</p>
        )}
      </div>

      {admin ? 
      <div className="flex items-center gap-2 border border-white rounded-lg px-3 py-1 bg-white">
      <p className="text-gray-500">🔍</p>
      <input
        className="w-40 md:w-60 px-2 py-1 text-gray-600 text-md font-serif border-none outline-none bg-transparent focus:bg-white "
        name="input"
        placeholder="Search..."
        value={searchEmployee}
        onChange={handleChange}
       />
    </div>
    :
    null
      }

      <div>
        {token ?
          <Link
            className="no-underline text-lg font-semibold hover:text-yellow-300 transition"
            href="/user/login" onClick={handleLogout}
          >
            Logout
          </Link>
          :
          <Link
            className="no-underline text-lg font-semibold hover:text-yellow-300 transition"
            href="/user/login"
          >
            Login
          </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
