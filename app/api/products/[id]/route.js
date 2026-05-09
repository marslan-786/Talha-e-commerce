import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// مخصوص پروڈکٹ ڈیلیٹ کرنے کے لیے
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// مخصوص پروڈکٹ اپ ڈیٹ (Edit) کرنے کے لیے
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
