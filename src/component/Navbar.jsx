import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import { Menu, X } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();


  return (
    <nav className="rounded-2xl shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="inline-flex items-center">
          <Link className="inline-flex items-center" to="/">
				<div className="text-xl font-bold text-[#00473e]">An </div>
			    <img src="/logoh.png" className="w-5 h-5" />
			    <div className="text-xl font-bold text-[#00473e]">ime</div>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-[#272343] hover:text-[#bae8e8]">Home</Link>

          {user ? (
            <>
              <Link to="/">
                <span className="text-md font-semibold text-[#6246ea] underline">{user.name}</span>
              </Link>
              <button
                          onClick={() => {
                  localStorage.removeItem('user');
                  Swal.fire('Success', 'Signed out!', 'success').then(() => {
                  navigate('/signin');});
    }}
                className="text-white pl-3 pr-3 pt-1 pb-1 rounded-sm bg-[#6246ea] hover:text-[#bae8e8]"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="text-white pl-3 pr-3 pt-1 pb-1 rounded-sm bg-[#6246ea] hover:text-[#bae8e8]"
            >
              Sign In
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X color="#272343" className="w-6 h-6" /> : <Menu color="#6246ea" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-2 pb-4 space-y-2">
          <ul>
            <Link to="/" className="text-[#272343] hover:text-indigo-600">
              <li className="mb-1">Home</li>
            </Link>
            {user ? (
              <>
                <li className="text-xl font-semibold text-[#6246ea] underline mb-1">{user.name}</li>
                <button
                             onClick={() => {
                  localStorage.removeItem('user');
                  Swal.fire('Success', 'Signed out!', 'success').then(() => {
                  navigate('/signin');});
    }}
                  className="text-[#272343] px-4 py-1 rounded-2xl hover:text-[#bae8e8]"
                >
                  Sign Out
                </button>
       
              </>
            ) : (
              <Link
                to="/signin"
                className="text-[#272343] px-4 py-1 rounded-2xl hover:text-[#bae8e8]"
              >
                <li className="mb-1">Sign In</li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
