import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const producto = await Producto.findById(id);
    if (!producto) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const data = await request.json();
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    if (!producto) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    await Producto.findByIdAndDelete(id);
    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}
