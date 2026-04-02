"use client";

import { useState } from "react";
import Link from "next/link";

function formatPrecio(precio) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}

function ProductoModal({ producto, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-56 bg-curiosos-morado-claro rounded-t-2xl flex items-center justify-center overflow-hidden">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl">🎁</span>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-curiosos-texto pr-4">{producto.nombre}</h2>
            <button onClick={onClose} className="text-curiosos-texto-suave hover:text-curiosos-texto text-xl shrink-0">✕</button>
          </div>
          <span className="inline-block text-xs bg-curiosos-morado-claro text-curiosos-morado px-3 py-1 rounded-full mb-4">
            {producto.categoria}
          </span>
          <p className="text-curiosos-texto-suave text-sm mb-4">{producto.descripcion}</p>
          {producto.caracteristicas?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-curiosos-texto mb-2">Características</p>
              <ul className="space-y-1">
                {producto.caracteristicas.map((c, i) => (
                  <li key={i} className="text-sm text-curiosos-texto-suave flex gap-2">
                    <span className="text-curiosos-morado">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-curiosos-borde">
            <p className="text-2xl font-bold text-curiosos-morado">{formatPrecio(producto.precio)}</p>
            <a
              href={`https://wa.me/573102957076?text=Hola, quiero pedir: ${encodeURIComponent(producto.nombre)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-curiosos-morado text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Destacados({ productos }) {
  const [seleccionado, setSeleccionado] = useState(null);

  if (!productos || productos.length === 0) return null;

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Título */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-curiosos-morado mb-1">
              Lo más popular
            </p>
            <h2 className="text-3xl font-bold text-curiosos-texto">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/productos"
            className="hidden sm:inline-flex text-sm font-medium text-curiosos-morado hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {productos.map((producto) => (
            <div
              key={producto._id}
              onClick={() => setSeleccionado(producto)}
              className="bg-curiosos-fondo rounded-2xl border border-curiosos-borde cursor-pointer hover:shadow-md hover:scale-[1.02] transition overflow-hidden"
            >
              <div className="h-40 bg-curiosos-morado-claro flex items-center justify-center overflow-hidden">
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🎁</span>
                )}
              </div>
              <div className="p-3">
                <span className="text-xs text-curiosos-morado font-medium">{producto.categoria}</span>
                <p className="text-sm font-semibold text-curiosos-texto mt-1 line-clamp-2">{producto.nombre}</p>
                <p className="text-curiosos-naranja font-bold mt-2 text-sm">{formatPrecio(producto.precio)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ver todos — mobile */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/productos"
            className="inline-block bg-curiosos-morado text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
          >
            Ver todos los productos
          </Link>
        </div>

      </div>

      {seleccionado && (
        <ProductoModal producto={seleccionado} onClose={() => setSeleccionado(null)} />
      )}
    </section>
  );
}
