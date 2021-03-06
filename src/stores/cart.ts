import { defineStore } from "pinia";
import { CART_STORAGE } from "../composables/usePersistCart";
import { almacenProductos } from "./products";

// Tipos de datos
export interface Purchase {
  productId: string;
  quantity: number;
}
// Tipo de datos
interface CartState {
  contents: Record<string, Purchase>;
}
// Tipo de datos
export interface CartPreview {
  id: string;
  image: string;
  title: string;
  quantity: number;
  cost: number;
}

export const almacenCart = defineStore({
  id: "cart",

  state: (): CartState => ({
    contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
  }),

  getters: {
    count(): number {
      // acumulado
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity;
      }, 0);
    },

    total(): number {
      const products = almacenProductos();
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity;
      }, 0);
    },

    formattedCart(): CartPreview[] {
      const products = almacenProductos();

      if (!products.loaded) return [];

      return Object.keys(this.contents).map((productId) => {
        const purchase = this.contents[productId];

        return {
          id: purchase.productId,
          image: products.items[purchase.productId].image,
          title: products.items[purchase.productId].title,
          quantity: purchase.quantity,
          cost: purchase.quantity * products.items[purchase.productId].price,
        };
      });
    },
  },

  actions: {
    add(productId: string) {
      if (this.contents[productId]) {
        this.contents[productId].quantity += 1;
      } else {
        this.contents[productId] = {
          productId,
          quantity: 1,
        };
      }
    },
    remove(productId: string) {
      if (!this.contents[productId]) {
        return;
      }

      this.contents[productId].quantity -= 1;

      if (this.contents[productId].quantity === 0) {
        delete this.contents[productId];
      }
    },
  },
});
