import ProductoForm from "@/components/ProductoForm";

export default function NuevoProductoPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-curiosos-texto mb-1">Nuevo producto</h1>
      <p className="text-curiosos-texto-suave text-sm mb-8">Completa los campos para agregar un producto</p>
      <ProductoForm />
    </div>
  );
}
