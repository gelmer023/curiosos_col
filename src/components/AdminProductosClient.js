"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminProductosClient({ productos }) {
  const [eliminando, setEliminando] = useState(null);
  const router = useRouter();

  async function handleEliminar(id) {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    setEliminando(id);
    await fetch(`/api/productos/${id}`, { method: "DELETE" });
    router.refresh();
    setEliminando(null);
  }

  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-curiosos-borde p-10 text-center">
        <p className="text-curiosos-texto-suave mb-4">No hay productos aún.</p>
        <Link
          href="/admin/productos/nuevo"
          className="bg-curiosos-morado text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Agregar primer producto
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-curiosos-borde overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-curiosos-fondo text-curiosos-texto-suave border-b border-curiosos-borde">
              <th className="text-left px-4 py-3">Producto</th>
              <th className="text-left px-4 py-3">Categoría</th>
              <th className="text-left px-4 py-3">Precio</th>
              <th className="text-left px-4 py-3">Disponible</th>
              <th className="text-left px-4 py-3">Destacado</th>
              <th className="text-right px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p._id} className="border-b border-curiosos-borde last:border-0 hover:bg-curiosos-fondo transition">
                <td className="px-4 py-3 font-medium text-curiosos-texto">{p.nombre}</td>
                <td className="px-4 py-3 text-curiosos-texto-suave">{p.categoria}</td>
                <td className="px-4 py-3 text-curiosos-texto">${p.precio.toLocaleString("es-CO")}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${p.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {p.disponible ? "Sí" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${p.destacado ? "bg-curiosos-naranja-claro text-curiosos-naranja" : "bg-curiosos-fondo text-curiosos-texto-suave"}`}>
                    {p.destacado ? "Sí" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/productos/${p._id}/editar`}
                      className="px-3 py-1 rounded-lg border border-curiosos-borde text-curiosos-texto-suave text-xs hover:border-curiosos-morado hover:text-curiosos-morado transition"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(p._id)}
                      disabled={eliminando === p._id}
                      className="px-3 py-1 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition disabled:opacity-50"
                    >
                      {eliminando === p._id ? "..." : "Eliminar"}
                    </button>
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
