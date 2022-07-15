import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductState {
  items: Record<string, Product>;
  ids: string[];
  productos: Product[];
}
export const almacenProductos = defineStore({
  id: "productos",
  state: (): ProductState => ({
    items: {},
    ids: [],
    productos: [],
  }),
  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },
    loaded(): boolean {
      return this.ids.length > 0;
    },
  },
  actions: {
    /**
     * Retrieve all todo for the signed in user
     */
    async obtenerProductos() {
      try {
        const { data: elementos, error } = await supabase
          .from("elementos")
          .select("*")
          .order("id");

        if (error) {
          console.log("error", error);
          return;
        }
        // handle for when no todos are returned
        if (elementos === null) {
          this.productos = [];
          return;
        }
        // store response to allTodos
        this.productos = elementos;
        console.log("got todos!", this.productos);
        console.log("Este es el array productos", this.productos);
        const data: Product[] = this.productos;
        this.ids = data.map((product) => {
          this.items[product.id] = product;
          return product.id;
        });
        console.log("Este es el array ids", this.ids);
        console.log("Este es el objeto items", this.items);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
  },
});
