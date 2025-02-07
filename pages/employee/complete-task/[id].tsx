import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { API } from "../../../global";
import Cookies from "js-cookie";

const CompleteTask: React.FC = () => {
  const [completionLink, setCompletionLink] = useState("");
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");

  const finishTask = async () => {
    if (!completionLink.trim()) {
      alert("Please enter a valid completion link.");
      return;
    }

    try {
      setLoading(true)
      await axios.post(
        `${API}employee/complete-task/`, {
        taskId: id,
        completionLink
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false)
      alert("Task completed successfully!");

      router.push("/employee/get-task");
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to submit task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-6 ">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-100 border  border-blue-800">
        <h3 className="text-center text-lg font-semibold mb-4">Task Submission</h3>

        <label className="block text-md font-semibold text-gray-700 mb-1">
          Completion Link
        </label>
        <input
          type="url"
          placeholder="https://github.com/employee/task"
          value={completionLink}
          onChange={(e) => setCompletionLink(e.target.value)}
          className="w-full border border-gray-400 rounded-lg shadow-sm focus:outline-none  focus:ring-2 focus:ring-blue-400 px-3 py-2"
        />
        {loading ?
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          :
          <button
            onClick={finishTask}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Task
          </button>
        }

      </div>
    </div>
  );
};

export default CompleteTask;
