import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../global";
import Cookies from "js-cookie";
import Link from "next/link";

interface TaskProps {
  _id: string;
  title: string;
  description: string;
  department: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

const GetTask: React.FC = () => {
  const [task, setTask] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(false)
  const token = Cookies.get("token");

  const fetchTask = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}employee/my-task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask(response.data);
      setLoading(false)
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTask();
    }
  }, [token]);

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center p-6 lg:mt-10 ">
      {loading ?
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        :
        task.length > 0 ? (
          task.map((item) => (
            <div
              key={item._id}
              className="
                bg-white shadow-lg rounded-2xl p-6 w-96 border border-gray-200 
                hover:shadow-2xl transition-all hover:translate-y-1"
            >
              <div className="bg-blue-600 text-white p-3 rounded-t-lg text-lg font-semibold text-center">
                {item.title}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{item.description}</h3>
                <p className="text-gray-600">Department: {item.department}</p>
                <p className="text-red-600 font-semibold">Status: {item.status}</p>
                <p className="text-gray-600">
                  Created At: {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Due Date: {new Date(item.dueDate).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end items-center border-t pt-3">
                <Link
                  href={`/employee/complete-task/${item._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition no-underline"
                >
                  Complete Task
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-red-500">
              No Tasks Available Right Now!!
            </p>
            <p className="text-gray-600">Please Contact the Admin to Verify</p>
          </div>
        )}

    </div>
  );
};

export default GetTask;
