"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Railway کی Environment Variable سے میچ کریں گے
    if (key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard/add");
    } else {
      alert("Invalid Access Key!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Caliber 7 Admin</h2>
        <input 
          type="password" 
          placeholder="Enter Access Key..." 
          className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setKey(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}
