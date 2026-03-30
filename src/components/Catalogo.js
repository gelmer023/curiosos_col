"use client";

import { useState } from "react";

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
        {/* Imagen */}
        <div className="w-full h-56 bg-curiosos-morado-claro rounded-t-2xl flex items-center justify-center overflow-hidden">
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl">🎁</span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-curiosos-texto pr-4">
              {producto.nombre}
            </h2>
            <button
              onClick={onClose}
              className="text-curiosos-texto-suave hover:text-curiosos-texto text-xl shrink-0"
            >
              ✕
            </button>
          </div>

          <span className="inline-block text-xs bg-curiosos-morado-claro text-curiosos-morado px-3 py-1 rounded-full mb-4">
            {producto.categoria}
          </span>

          <p className="text-curiosos-texto-suave text-sm mb-4">
            {producto.descripcion}
          </p>

          {/* Características */}
          {producto.caracteristicas?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-curiosos-texto mb-2">
                Características
              </p>
              <ul className="space-y-1">
                {producto.caracteristicas.map((c, i) => (
                  <li key={i} className="text-sm text-curiosos-texto-suave flex gap-2">
                    <span className="text-curiosos-morado">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variantes */}
          {producto.variantes?.length > 0 && (
            <div className="mb-4">
              {producto.variantes.map((v, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm font-semibold text-curiosos-texto mb-1">
                    {v.nombre}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {v.opciones.map((op, j) => (
                      <span
                        key={j}
                        className="text-xs border border-curiosos-borde px-3 py-1 rounded-full text-curiosos-texto-suave"
                      >
                        {op}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Precio y botón */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-curiosos-borde">
            <p className="text-2xl font-bold text-curiosos-morado">
              {formatPrecio(producto.precio)}
            </p>
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

export default function Catalogo({ productos }) {
  const [seleccionado, setSeleccionado] = useState(null);

  if (productos.length === 0) {
    return (
      <p className="text-curiosos-texto-suave text-center py-20">
        No hay productos aún.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <div
            key={producto._id}
            onClick={() => setSeleccionado(producto)}
            className="bg-white rounded-2xl shadow-sm border border-curiosos-borde cursor-pointer hover:shadow-md hover:scale-[1.02] transition overflow-hidden"
          >
            {/* Imagen tarjeta */}
            <div className="h-40 bg-curiosos-morado-claro flex items-center justify-center overflow-hidden">
              {producto.imagen ? (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">🎁</span>
              )}
            </div>

            {/* Info tarjeta */}
            <div className="p-3">
              <span className="text-xs text-curiosos-morado font-medium">
                {producto.categoria}
              </span>
              <p className="text-sm font-semibold text-curiosos-texto mt-1 line-clamp-2">
                {producto.nombre}
              </p>
              <p className="text-curiosos-naranja font-bold mt-2 text-sm">
                {formatPrecio(producto.precio)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {seleccionado && (
        <ProductoModal
          producto={seleccionado}
          onClose={() => setSeleccionado(null)}
        />
      )}
    </>
  );
}
