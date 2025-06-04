import  { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
   
    if (!name.trim() || !email.trim() || !password.trim()) {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
      return;
    }

    if (name.trim().length < 5) {
      Swal.fire('Error', 'Name must be at least 5 characters long.', 'error');
      return;
    }

    if (password.trim().length < 8) {
      Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
      return;
    }

    try {
      await axios.post('https://68382fb12c55e01d184c5076.mockapi.io/Users', {
        name,
        email,
		password,
		type:'user'
      });

      Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
        navigate('/signin');
      });
    } catch  {
      Swal.fire('Error', 'Registration failed. Try again.', 'error');
    }
  };

	return (
	  <>
	
	  <div className="h-screen bg-slate-50 flex justify-center items-center w-full">
	   
    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
       
			  <div className="space-y-4">
			
        <h1 className="text-center text-xl font-semibold text-gray-600">Register</h1>
        <div>
          <label for="email" className="block mb-1 text-gray-600 font-semibold">Username</label>
          <input  type="text"
                  value={name}
					onChange={(e) => setName(e.target.value)}
					className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label for="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
				<input
					type="email"
                    value={email}
					onChange={(e) => setEmail(e.target.value)}
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
		<button  onClick={handleSignup} className="mt-4 w-full bg-[#9c3636] font-semibold py-2 text-white rounded-md  tracking-wide">Register</button>
		 <div className="mt-4 text-sm text-gray-600"> Already have an account?
			  <Link to="/signin">
				  <button className="underline">Sign In</button>
			  </Link>
             </div>
    </div>

			</div>
			</>
  );
}



