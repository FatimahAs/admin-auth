import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

export default function Signin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!name.trim() || !password.trim()) {
      Swal.fire('Error', ' Fill all field', 'error');
      return;
    }

    try {
      const res = await axios.get('https://68382fb12c55e01d184c5076.mockapi.io/Users');
      const users = res.data;

      const matchedUser = users.find(
        (user) => user.name === name && user.password === password
      );

   if (matchedUser) {
  localStorage.setItem('user', JSON.stringify(matchedUser));

  Swal.fire('Success', 'Welcome Back!', 'success').then(() => {
    if (matchedUser.type === 'admin') {
      navigate('/admin'); 
    } else {
      navigate('/');
    }
  });

		  
      } else {
        Swal.fire('Error', 'Name or Password in incorrect', 'error');
      }
    } catch {
      Swal.fire('Error', 'Try again   ', 'error');
    }
  };

  return (
  <div className="h-screen bg-slate-50 flex justify-center items-center w-full">

    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
   
      <div className="space-y-4">
        <h1 className="text-center text-xl font-semibold text-gray-600">Welcome Back </h1>
        <div>
          <label for="email" className="block mb-1 text-gray-600 font-semibold">Username</label>
          <input  type="text"
                  value={name}
					onChange={(e) => setName(e.target.value)}
					className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      
        <div>
          <label  className="block mb-1 text-gray-600 font-semibold">Password</label>
				<input
					type="password"
                    value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
		<button   onClick={handleSignin} className="mt-4 w-full bg-[#9c3636] text-white font-semibold py-2 rounded-md  tracking-wide">Sign In</button>
		    <div className="mt-4 text-sm text-gray-600"> Don't  have an account?
                <Link to="/signup"><button className="underline ">Sign Up</button></Link>
            </div>
    </div>

</div>

	  
  );
}


	