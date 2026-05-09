"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // ہارڈ کوڈڈ پاسورڈ چیک
    if (key === "talha12") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard/manage"); // لاگ ان کے بعد مینج پیج پر بھیج دیں گے
    } else {
      alert("Invalid Access Key!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Caliber 7 Admin</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your secret access key to continue</p>
        <input 
          type="password" 
          placeholder="Access Key..." 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 outline-none focus:border-black transition-all text-black"
          onChange={(e) => setKey(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-md">
          Verify & Enter
        </button>
      </div>
    </div>
  );
}
