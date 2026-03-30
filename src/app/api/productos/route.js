import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";

export async function GET() {
    try {
        await connectDB();
        const productos = await Producto.find();
        return NextResponse.json(productos);
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener los productos" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const producto = await Producto.create(data);
        return NextResponse.json(producto, { status: 201 });
    }catch (error) {
        return NextResponse.json({ error: "Error al crear el producto" }, { status: 500 });
    }
}