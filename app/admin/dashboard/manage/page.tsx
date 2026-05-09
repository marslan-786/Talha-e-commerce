"use client";
import { useEffect, useState } from "react";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  // پروڈکٹس لوڈ کرنا
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ڈیلیٹ فنکشن
  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Deleted! 🗑️");
        fetchProducts();
      }
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Inventory</h1>
        <a href="/admin/dashboard/add" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">+ Add New</a>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Price (PKR)</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: any) => (
              <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4">
                  <img src={item.imageUrl} className="w-16 h-16 object-cover rounded-md border" alt="product" />
                </td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4 text-green-700 font-bold">Rs. {item.price}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => deleteProduct(item._id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
