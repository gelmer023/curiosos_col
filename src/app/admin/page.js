import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";
import Link from "next/link";

export default async function AdminDashboard() {
  await connectDB();
  const totalProductos = await Producto.countDocuments();
  const destacados = await Producto.countDocuments({ destacado: true });
  const noDisponibles = await Producto.countDocuments({ disponible: false });
  const recientes = await Producto.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-curiosos-texto mb-1">Dashboard</h1>
      <p className="text-curiosos-texto-suave text-sm mb-8">Bienvenido al panel de administración</p>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl border border-curiosos-borde p-5">
          <p className="text-curiosos-texto-suave text-sm">Total productos</p>
          <p className="text-3xl font-bold text-curiosos-morado mt-1">{totalProductos}</p>
        </div>
        <div className="bg-white rounded-2xl border border-curiosos-borde p-5">
          <p className="text-curiosos-texto-suave text-sm">Destacados</p>
          <p className="text-3xl font-bold text-curiosos-naranja mt-1">{destacados}</p>
        </div>
        <div className="bg-white rounded-2xl border border-curiosos-borde p-5">
          <p className="text-curiosos-texto-suave text-sm">No disponibles</p>
          <p className="text-3xl font-bold text-curiosos-rosa mt-1">{noDisponibles}</p>
        </div>
      </div>

      {/* Productos recientes */}
      <div className="bg-white rounded-2xl border border-curiosos-borde p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-curiosos-texto">Productos recientes</h2>
          <Link href="/admin/productos" className="text-sm text-curiosos-morado hover:opacity-75">
            Ver todos →
          </Link>
        </div>

        {recientes.length === 0 ? (
          <p className="text-curiosos-texto-suave text-sm">No hay productos aún.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-curiosos-texto-suave border-b border-curiosos-borde">
                <th className="text-left py-2">Nombre</th>
                <th className="text-left py-2">Categoría</th>
                <th className="text-left py-2">Precio</th>
                <th className="text-left py-2">Disponible</th>
              </tr>
            </thead>
            <tbody>
              {recientes.map((p) => (
                <tr key={p._id} className="border-b border-curiosos-borde last:border-0">
                  <td className="py-2 text-curiosos-texto">{p.nombre}</td>
                  <td className="py-2 text-curiosos-texto-suave">{p.categoria}</td>
                  <td className="py-2 text-curiosos-texto">${p.precio.toLocaleString("es-CO")}</td>
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${p.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {p.disponible ? "Sí" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
