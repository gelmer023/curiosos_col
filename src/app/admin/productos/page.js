import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";
import Link from "next/link";
import AdminProductosClient from "@/components/AdminProductosClient";

export default async function AdminProductosPage() {
  await connectDB();
  const productos = await Producto.find().sort({ createdAt: -1 }).lean();
  const productosSerializados = JSON.parse(JSON.stringify(productos));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-curiosos-texto">Productos</h1>
          <p className="text-curiosos-texto-suave text-sm">{productos.length} productos en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-curiosos-morado text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          + Agregar producto
        </Link>
      </div>

      <AdminProductosClient productos={productosSerializados} />
    </div>
  );
}
