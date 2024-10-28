import "animate.css";
import React, { useState } from "react";
import Swal from "sweetalert2";

function App() {
  return (
    <>
      <div className="bg-slate-400">
        <div className="flex min-h-screen">
          <Sidebar />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App;

function Sidebar() {
  return (
    <aside className="bg-zinc-600 w-72 text-white">
      <div className="p-8 mt-10">
        <h2 className="font-bold text-4xl">Admin&nbsp;Panel</h2>
        <nav className="mt-4 ml-4">
          <ul>
            <li className="mb-4 flex items-center">
              <i data-feather="home" className="mr-2"></i>
              <a href="#" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li className="mb-4 flex items-center">
              <i data-feather="users" className="mr-2"></i>
              <a href="#" className="hover:underline">
                Mahasiswa
              </a>
            </li>
            <li className="flex items-center">
              <i data-feather="settings" className="mr-2"></i>
              <a href="#" className="hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function Content() {
  const [students, setStudents] = useState([
    { id: 1, nim: 'A11.2022.14608', nama: 'whoiscraz' },
    { id: 2, nim: 'A11.2023.14999', nama: 'WOI' },
    { id: 3, nim: 'A11.2024.15000', nama: 'LAH' },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const openAddModal = () => {
    setCurrentStudent(null);
    setOpenModal(true);
  };

  const openEditModal = (student) => {
    Swal.fire({
      title: "Ini Yang Mau di Edit?",
      text: "Jangan Salah Orang Loh",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "IYA, Bener Kok Ini",
      cancelButtonText: "EH, Kayaknya Salah Deh",
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentStudent(student);
        setOpenModal(true);
      }
    });
  };

  const closeModal = () => setOpenModal(false);

  const showNotification = (message) => {
    Swal.fire({
      title: message,
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    });
  };

  const addOrEditStudent = (student) => {
    if (student.id) {
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s.id === student.id ? student : s))
      );
      showNotification("Gonta Ganti Bae Lu Mah");
    } else {
      setStudents((prevStudents) => [
        ...prevStudents,
        { ...student, id: Date.now() },
      ]);
      showNotification("Tambah Personil Gini Lek!");
    }
    closeModal();
  };

  const deleteStudent = (id) => {
    Swal.fire({
      title: "Rill di Hapus Kah?",
      text: "Apakah Dia Terlalu berdosa??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "IYA, Kebanyakan Dosa",
      cancelButtonText: "Beda Orang"
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Terhapus Dari Sistem Suci Ini",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="flex flex-col flex-1">
        <Header />
        <Main
          students={students}
          onAdd={openAddModal}
          onEdit={openEditModal}
          onDelete={deleteStudent}
        />
        <Footer />
      </div>
      {openModal && (
        <AddMhsModal
          onClose={closeModal}
          onSave={addOrEditStudent}
          student={currentStudent}
        />
      )}
    </>
  );
}

function Header() {
  const handleLogout = () => {
    Swal.fire({
      title: "Mau Keluar Deck?",
      text: "Yakin kah? engga dicek dulu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "IYA, ntar juga balik",
      cancelButtonText: "kaga jadi dah"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "Nanti Balik Lagi Aja",
          icon: "success"
        });
        // Implement your logout logic here, e.g., redirecting to a login page
      }
    });
  };

  return (
    <header className="bg-zinc-200 p-4 flex justify-end">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}


function Main({ students, onAdd, onEdit, onDelete }) {
  return (
    <main className="bg-white p-6 flex-grow">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold text-2xl mb-4">Daftar Mahasiswa</h2>
        <button
          className="bg-green-500 px-4 py-2 rounded-xl text-white mb-4"
          onClick={onAdd}>
          Tambah Mahasiswa
        </button>
        <table className="min-w-full table-auto" id="studentTable">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">No.</th>
              <th className="border px-4 py-2">NIM</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{student.nim}</td>
                <td className="border px-4 py-2">{student.nama}</td>
                <td className="border px-4 py-2 flex gap-5">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => onEdit(student)}>
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => onDelete(student.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-500 text-center text-white p-4">
      All Right Reserved &copy; 2024 Makan Gratis
    </footer>
  );
}

function AddMhsModal({ onClose, onSave, student }) {
  const [nim, setNim] = useState(student?.nim || "");
  const [nama, setNama] = useState(student?.nama || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: student?.id, nim, nama });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/3 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {student ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nim" className="block font-semibold mb-1">
              NIM
            </label>
            <input
              type="text"
              id="nim"
              className="w-full border px-4 py-2"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nama" className="block font-semibold mb-1">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              className="w-full border px-4 py-2"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
