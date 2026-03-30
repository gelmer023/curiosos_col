import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";
import Catalogo from "@/components/Catalogo";

export default async function ProductosPage() {
  await connectDB();
  const productos = await Producto.find().lean();

  // Convertimos a objetos planos para pasarlos al componente cliente
  const productosSerializados = JSON.parse(JSON.stringify(productos));

  return (
    <main className="min-h-screen bg-curiosos-fondo py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-curiosos-texto mb-2">
          Nuestros Productos
        </h1>
        <p className="text-curiosos-texto-suave mb-8">
          Encuentra todo lo que necesitas para tu celebración
        </p>
        <Catalogo productos={productosSerializados} />
      </div>
    </main>
  );
}
