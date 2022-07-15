import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface TiposEstado {
  productos: Product[];
  size: string;
  uploading: boolean;
  loading: boolean;
  src: string;
  files: any;
  filePath: any;
  error: string | null;
  editar: boolean;
  urlDescarga: any;
  producto: Product;
}

export const almacenForm = defineStore({
  id: "form",
  state: (): TiposEstado => ({
    productos: [],
    size: "10em",
    uploading: false,
    loading: false,
    src: "",
    files: null,
    filePath: null,
    error: null,
    editar: false,
    urlDescarga: {},
    producto: {
      id: "",
      title: "",
      price: 0,
      description: "",
      image: "",
    },
  }),
  actions: {
    async obtenerDatos() {
      try {
        const { data: elementos, error } = await supabase
          .from("elementos")
          .select("*")
          .order("id");
        if (error) {
          console.log("error", error);
          return;
        }
        // Cuando no devuelve datos
        if (elementos === null) {
          this.productos = [];
          return;
        }
        // Cuando devuelve datos
        this.productos = elementos;
        console.log("Productos ", this.productos);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
    async obtenerDatoId(id: string) {
      try {
        const { data: elementos, error } = await supabase
          .from("elementos")
          .select("id, title, description, price")
          .eq("id", id)
          .single();
        if (error) {
          console.log("error", error);
          return;
        }
        // Cuando no devuelve datos
        if (elementos === null) {
          this.productos = [];
        }
        // Cuando devuelve datos
        this.producto = elementos;
        console.log("Producto ", this.producto);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
    async eliminarDato(id: string) {
      try {
        await supabase.from("elementos").delete().eq("id", id);
        console.log("Dato eliminado", id);
      } catch (error) {
        console.error("error", error);
      }
    },
    async agregarDato() {
      this.loading = true;
      try {
        const producto = {
          title: this.producto.title,
          price: this.producto.price,
          description: this.producto.description,
          image: this.urlDescarga,
        };
        const { data, error } = await supabase
          .from("elementos")
          .insert(producto)
          .single();
        if (error) {
          alert(error);
          console.error("There was an error inserting", error.message);
          return null;
        }
        console.log("Nuevo producto creado");
        return data;
      } catch (err) {
        alert("Error");
        console.error("Unknown problem inserting to db", err);
        return null;
      } finally {
        this.loading = false;
      }
    },
    async actualizarDatoCampo(producto: Product, isCompleted: boolean) {
      try {
        const { error } = await supabase
          .from("elementos")
          .update({ is_complete: isCompleted })
          .eq("id", producto.id)
          .single();

        if (error) {
          alert(error.message);
          console.error("There was an error updating", error);
          return;
        }

        console.log("Dato validado", producto.id);
      } catch (err) {
        alert("Error");
        console.error("Unknown problem updating record", err);
      }
    },
    async actualizarDato() {
      this.loading = true;
      try {
        const datos = {
          id: this.producto.id,
          title: this.producto.title,
          price: this.producto.price,
          description: this.producto.description,
          image: this.urlDescarga,
        };
        const { error } = await supabase.from("elementos").upsert(datos, {
          returning: "minimal", // Don't return the value after inserting
        });
        if (error) throw error;
      } catch (error) {
        alert(error);
      } finally {
        this.loading = true;
      }
    },
    async subirArchivoAgregar(event: any) {
      // Selecciona el archivo y lo prepara
      this.files = event.target.files;
      try {
        this.uploading = true;
        if (!this.files || this.files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        // Datos archivo
        const file = this.files[0];
        const fileExt = file.name.split(".").pop(); // varias ext
        const fileName = `${Math.random()}.${fileExt}`; // nombre random
        this.filePath = `${fileName}`;
        // Sube el archivo al storage
        console.log("filePath ", this.filePath);
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(this.filePath, file);
        if (uploadError) throw uploadError;
        // Obtien la URL de descarga
        this.urlDescarga = await supabase.storage
          .from("avatars")
          .getPublicUrl(fileName).data?.publicURL;
        console.log("urlDescarga", this.urlDescarga);
        // Descarga la imagen
        this.downloadImage();
        this.agregarDato();
      } catch (error) {
        alert(error);
      } finally {
        this.uploading = false;
      }
    },
    async subirArchivoActualizar(event: any) {
      // Selecciona el archivo y lo prepara
      this.files = event.target.files;
      try {
        this.uploading = true;
        if (!this.files || this.files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        // Datos archivo
        const file = this.files[0];
        const fileExt = file.name.split(".").pop(); // varias ext
        const fileName = `${Math.random()}.${fileExt}`; // nombre random
        this.filePath = `${fileName}`;
        // Sube el archivo al storage
        console.log("filePath ", this.filePath);
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(this.filePath, file);
        if (uploadError) throw uploadError;
        // Obtien la URL de descarga
        this.urlDescarga = await supabase.storage
          .from("avatars")
          .getPublicUrl(fileName).data?.publicURL;
        console.log("urlDescarga", this.urlDescarga);
        // Descarga la imagen
        this.downloadImage();
        this.actualizarDato();
      } catch (error) {
        alert(error);
      } finally {
        this.uploading = false;
      }
    },
    async downloadImage() {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(this.filePath);
        console.log("donwnload", this.filePath);
        if (error) throw error;
        this.src = URL.createObjectURL(data as any);
        console.log("src ", this.src);
      } catch (error) {
        console.error("Error downloading image: ", error);
      }
    },
  },
});
