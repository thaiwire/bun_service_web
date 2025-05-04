'use client';

import Swal from "sweetalert2";
import {config} from './config';
import { useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";


export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (username == '' || password == '') {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill in all fields",
          confirmButtonText: "OK",
        });
        return;
      }

      const payload ={
        username: username,
        password: password,
      }

      const response = await axios.post(`${config.apiUrl}/api/user/login`, payload);
      if (response.data.token !== undefined) {
        localStorage.setItem(config.tokenKey, response.data.token);
        router.push("/dashboard");
      }


    } catch (error : any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonText: "OK",
      });
    }  
 }
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r
     from-gray-800 to-gray-500">
       <div className="text-gray-400 text-4xl font-bold mb-8">
        ระบบ Bunservice 2025
       </div>
       <div className="bg-gray-500 p-8 rounded-2xl shadow-xl w-full max-w-md"> 
            <h1 className="text-2xl font-bold mb-4 text-white">
              เข้าสู่ระบบ
            </h1>
            <form className="flex flex-col gap-2 mt-10 w-full"
            onSubmit={handleSubmit}>
              <div className="text-white">
               <i className="fa fa-user mr-2"></i>
               UserName
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="UserName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="text-white">
               <i className="fa fa-lock mr-2"></i>
               Password
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300"
              >
                <i className="fa fa-sign-in mr-2"></i>
                เข้าสู่ระบบ
              </button>
            </form>
       </div>
    </div>
  );
}
