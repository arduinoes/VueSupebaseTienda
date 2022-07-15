import { onUnmounted } from "vue";
import { almacenCart } from "../stores/cart";

export const CART_STORAGE = "CART_STORAGE";

export const usePersistCart = () => {
  const cartStore = almacenCart();

  const unsub = cartStore.$subscribe(() => {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cartStore.contents));
  });

  onUnmounted(() => {
    unsub();
  });
};
