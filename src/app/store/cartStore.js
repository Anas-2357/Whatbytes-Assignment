import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const cart = get().cart;
                const exists = cart.find((item) => item.id === product.id);
                if (exists) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },

            removeFromCart: (id) => {
                set({
                    cart: get().cart.filter((item) => item.id !== id),
                });
            },

            updateQuantity: (id, quantity) => {
                set({
                    cart: get().cart.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },
            
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;