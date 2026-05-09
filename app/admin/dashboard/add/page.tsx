"use client";
import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({ title: "", description: "", price: "", imageUrl: "" });
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Product Added Successfully! ✅");
      setFormData({ title: "", description: "", price: "", imageUrl: "" });
      setPreview("");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      
      {/* Live Preview Area */}
      <div className="mb-6 w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-contain" />
        ) : (
          <p className="text-gray-400">Image Preview Will Appear Here</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Image URL..." 
            className="flex-1 p-3 border rounded-lg"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
          <button 
            type="button" 
            onClick={() => setPreview(formData.imageUrl)}
            className="bg-blue-600 text-white px-6 rounded-lg font-semibold"
          >
            Preview
          </button>
        </div>

        <input 
          type="text" 
          placeholder="Product Title..." 
          className="p-3 border rounded-lg" 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea 
          placeholder="Product Details..." 
          className="p-3 border rounded-lg h-32" 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <input 
          type="number" 
          placeholder="Price (PKR)..." 
          className="p-3 border rounded-lg" 
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
        
        <button type="submit" className="bg-black text-white p-4 rounded-lg text-lg font-bold hover:opacity-90">
          Publish Product
        </button>
      </form>
    </div>
  );
}
