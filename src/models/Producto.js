import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    caracteristicas: [String],
    precio: { 
        type: Number,
         required: true 
        },
    categoria: { 
        type: String, required: true 
    },
    imagen: { 
        type: String 
    },
    disponible: { 
        type: Boolean,
         default: true 
        },
    destacado: { 
        type: Boolean, 
        default: false 
    },
    pedidos: { 
        type: Number, 
        default: 0 
    },
    etiquetas: [String],
    variantes: [
    {
      nombre: String,
      opciones: [String],
    }
  ],
},{ timestamps: true });

export default mongoose.models.Producto || mongoose.model("Producto", ProductoSchema);
