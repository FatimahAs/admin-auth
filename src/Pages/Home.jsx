import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const apiUrl = "https://682199f9259dad2655afc0f9.mockapi.io/User";
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setCharacters(res.data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const isAdmin = loggedInUser?.type === "admin";

  const handleAdd = () => {
    if (!image || !name || !gender) {
      Swal.fire("خطأ", "يرجى تعبئة جميع الحقول", "error");
      return;
    }

    if (!loggedInUser || !isAdmin) {
      Swal.fire("غير مسموح", "فقط المدير يمكنه إضافة شخصية", "error");
      return;
    }

    const newCharacter = {
      image,
      name,
      gender,
      createdBy: loggedInUser.email,
    };

    axios
      .post(apiUrl, newCharacter)
      .then((res) => {
        setCharacters([...characters, res.data]);
        setImage("");
        setName("");
        setGender("");
      })
      .catch((err) => console.error("Error adding character:", err));
  };

  const handleDelete = (id) => {
    if (!isAdmin) {
      Swal.fire("غير مسموح", "فقط المدير يمكنه الحذف", "error");
      return;
    }

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لا يمكنك التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/${id}`)
          .then(() => {
            setCharacters(characters.filter((char) => char.id !== id));
          })
          .catch((err) => console.error("Error deleting character:", err));
      }
    });
  };

  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 w-full mx-auto flex flex-col items-center justify-center">
      <div className="lg:w-100">
        <input
          type="text"
          placeholder="Search ...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full mb-4 rounded-xl border-1 border-[#faae2b]"
        />
      </div>

      
      {isAdmin && (
        <div className="mb-6 p-4 rounded">
         
      
       
          <button
            onClick={handleAdd}
          >
        
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No Character Oops!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((char) => (
            <div
              key={char.id}
              className="bg-white border-1 border-[#f3d2c184] rounded shadow p-3 text-center relative"
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-bold">{char.name}</h3>
              <p className="text-sm text-gray-600">
                {char.gender === "Male" ? "Male" : "Female"}
              </p>

            
              {isAdmin && (
                <button
                  onClick={() => handleDelete(char.id)}
                  className="absolute top-1 right-1 text-red-600 hover:text-red-800 font-bold text-xl"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


