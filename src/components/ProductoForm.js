"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIAS = [
  "Decoración y Fiestas",
  "Anchetas y Detalles",
  "Desayunos Sorpresa",
  "Peluches y Accesorios",
  "Librería",
  "Organización de Eventos",
];

export default function ProductoForm({ producto }) {
  const router = useRouter();
  const esEdicion = !!producto;

  const [form, setForm] = useState({
    nombre: producto?.nombre || "",
    descripcion: producto?.descripcion || "",
    precio: producto?.precio || "",
    categoria: producto?.categoria || "",
    imagen: producto?.imagen || "",
    disponible: producto?.disponible ?? true,
    destacado: producto?.destacado ?? false,
    caracteristicas: producto?.caracteristicas || [],
    etiquetas: producto?.etiquetas || [],
    variantes: producto?.variantes || [],
  });

  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function agregarCaracteristica() {
    if (!nuevaCaracteristica.trim()) return;
    setForm((prev) => ({ ...prev, caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()] }));
    setNuevaCaracteristica("");
  }

  function eliminarCaracteristica(i) {
    setForm((prev) => ({ ...prev, caracteristicas: prev.caracteristicas.filter((_, idx) => idx !== i) }));
  }

  function agregarEtiqueta() {
    if (!nuevaEtiqueta.trim()) return;
    setForm((prev) => ({ ...prev, etiquetas: [...prev.etiquetas, nuevaEtiqueta.trim()] }));
    setNuevaEtiqueta("");
  }

  function eliminarEtiqueta(i) {
    setForm((prev) => ({ ...prev, etiquetas: prev.etiquetas.filter((_, idx) => idx !== i) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const url = esEdicion ? `/api/productos/${producto._id}` : "/api/productos";
    const method = esEdicion ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, precio: Number(form.precio) }),
    });

    router.push("/admin/productos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-curiosos-texto mb-1">Nombre *</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required
          className="w-full border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado" />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-curiosos-texto mb-1">Descripción *</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={3}
          className="w-full border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado resize-none" />
      </div>

      {/* Precio y Categoría */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-curiosos-texto mb-1">Precio *</label>
          <input name="precio" value={form.precio} onChange={handleChange} required type="number" min="0"
            className="w-full border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado" />
        </div>
        <div>
          <label className="block text-sm font-medium text-curiosos-texto mb-1">Categoría *</label>
          <select name="categoria" value={form.categoria} onChange={handleChange} required
            className="w-full border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado">
            <option value="">Seleccionar...</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Imagen URL */}
      <div>
        <label className="block text-sm font-medium text-curiosos-texto mb-1">URL de imagen</label>
        <input name="imagen" value={form.imagen} onChange={handleChange}
          className="w-full border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado"
          placeholder="https://..." />
      </div>

      {/* Disponible y Destacado */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-curiosos-texto cursor-pointer">
          <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange}
            className="accent-curiosos-morado" />
          Disponible
        </label>
        <label className="flex items-center gap-2 text-sm text-curiosos-texto cursor-pointer">
          <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange}
            className="accent-curiosos-morado" />
          Destacado
        </label>
      </div>

      {/* Características */}
      <div>
        <label className="block text-sm font-medium text-curiosos-texto mb-2">Características</label>
        <div className="flex gap-2 mb-2">
          <input value={nuevaCaracteristica} onChange={(e) => setNuevaCaracteristica(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), agregarCaracteristica())}
            className="flex-1 border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado"
            placeholder="Ej: Material: cartón" />
          <button type="button" onClick={agregarCaracteristica}
            className="bg-curiosos-morado-claro text-curiosos-morado px-3 py-2 rounded-lg text-sm hover:opacity-80 transition">
            + Agregar
          </button>
        </div>
        <ul className="space-y-1">
          {form.caracteristicas.map((c, i) => (
            <li key={i} className="flex items-center justify-between bg-curiosos-fondo px-3 py-1.5 rounded-lg text-sm">
              <span className="text-curiosos-texto">{c}</span>
              <button type="button" onClick={() => eliminarCaracteristica(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Etiquetas */}
      <div>
        <label className="block text-sm font-medium text-curiosos-texto mb-2">Etiquetas</label>
        <div className="flex gap-2 mb-2">
          <input value={nuevaEtiqueta} onChange={(e) => setNuevaEtiqueta(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), agregarEtiqueta())}
            className="flex-1 border border-curiosos-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-curiosos-morado"
            placeholder="Ej: cumpleaños" />
          <button type="button" onClick={agregarEtiqueta}
            className="bg-curiosos-morado-claro text-curiosos-morado px-3 py-2 rounded-lg text-sm hover:opacity-80 transition">
            + Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.etiquetas.map((et, i) => (
            <span key={i} className="flex items-center gap-1 bg-curiosos-naranja-claro text-curiosos-naranja px-3 py-1 rounded-full text-xs">
              {et}
              <button type="button" onClick={() => eliminarEtiqueta(i)} className="hover:opacity-70">✕</button>
            </span>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="bg-curiosos-morado text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50">
          {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear producto"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-curiosos-borde text-curiosos-texto-suave px-6 py-2 rounded-lg text-sm hover:bg-curiosos-fondo transition">
          Cancelar
        </button>
      </div>

    </form>
  );
}
