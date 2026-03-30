"use client";

import { useState } from "react";

export default function AdminPage() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, descripcion, precio: Number(precio), categoria }),
    });
    alert("Producto creado");
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin — Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          className="border p-2 rounded"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <button type="submit" className="bg-curiosos-morado text-white py-2 rounded">
          Guardar producto
        </button>
      </form>
    </main>
  );
}
