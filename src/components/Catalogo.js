"use client";

import { useState, useMemo } from "react";

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
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [orden, setOrden] = useState("relevancia");

  // Extraer categorías únicas de los productos
  const categorias = useMemo(() => {
    const unicas = [...new Set(productos.map((p) => p.categoria))].sort();
    return ["Todos", ...unicas];
  }, [productos]);

  // Filtrar y ordenar productos
  const productosFiltrados = useMemo(() => {
    let resultado = [...productos];

    // Filtrar por categoría
    if (categoriaActiva !== "Todos") {
      resultado = resultado.filter((p) => p.categoria === categoriaActiva);
    }

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.nombre.toLowerCase().includes(termino) ||
          p.descripcion.toLowerCase().includes(termino) ||
          p.categoria.toLowerCase().includes(termino)
      );
    }

    // Ordenar
    if (orden === "precio-asc") {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
      resultado.sort((a, b) => b.precio - a.precio);
    } else {
      // relevancia: destacados primero, luego por pedidos
      resultado.sort((a, b) => {
        if (b.destacado !== a.destacado) return b.destacado ? 1 : -1;
        return (b.pedidos || 0) - (a.pedidos || 0);
      });
    }

    return resultado;
  }, [productos, busqueda, categoriaActiva, orden]);

  return (
    <>
      {/* Barra de búsqueda y orden */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-curiosos-texto-suave text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-curiosos-borde bg-white text-sm text-curiosos-texto placeholder-curiosos-texto-suave focus:outline-none focus:border-curiosos-morado transition"
          />
        </div>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-curiosos-borde bg-white text-sm text-curiosos-texto focus:outline-none focus:border-curiosos-morado transition cursor-pointer"
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {/* Chips de categorías */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
              categoriaActiva === cat
                ? "bg-curiosos-morado text-white"
                : "bg-white border border-curiosos-borde text-curiosos-texto-suave hover:border-curiosos-morado hover:text-curiosos-morado"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Contador de resultados */}
      <p className="text-xs text-curiosos-texto-suave mb-4">
        {productosFiltrados.length === productos.length
          ? `${productos.length} productos`
          : `${productosFiltrados.length} de ${productos.length} productos`}
      </p>

      {/* Grid */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-curiosos-texto-suave">
            No encontramos productos con esa búsqueda.
          </p>
          <button
            onClick={() => { setBusqueda(""); setCategoriaActiva("Todos"); }}
            className="mt-4 text-sm text-curiosos-morado underline cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {productosFiltrados.map((producto) => (
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
      )}

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
