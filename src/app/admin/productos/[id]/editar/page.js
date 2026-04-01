import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";
import ProductoForm from "@/components/ProductoForm";

export default async function EditarProductoPage({ params }) {
  const { id } = await params;
  await connectDB();
  const producto = await Producto.findById(id).lean();
  const productoSerializado = JSON.parse(JSON.stringify(producto));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-curiosos-texto mb-1">Editar producto</h1>
      <p className="text-curiosos-texto-suave text-sm mb-8">{producto.nombre}</p>
      <ProductoForm producto={productoSerializado} />
    </div>
  );
}
