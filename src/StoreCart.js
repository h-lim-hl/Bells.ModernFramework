import { atom, useAtom } from "jotai";
import Immutable  from "seamless-immutable";

const shoppingCart = Immutable ([
  
]);

export const cartAtom = atom(shoppingCart);

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const getCart = () => { return cart };

  const getCartTotal = () => {
    let total = cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0);
    return total;
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex((item) => {
        return item.product_id === product.id
      });

      if (-1 < existingItemIndex) {
        const currentQuantity = currentCart[existingItemIndex].quantity;
        return currentCart.setIn([existingItemIndex, "quantity"],
          currentQuantity + 1);
      }

      const newCartItem = {
        ...product,
        id: Math.floor(Math.random() * 10000 + 1),
        product_id: product.id,
        quantity: 1
      };

      return currentCart.concat(newCartItem);
    })
  };

  const modifyCart = (product_id, quantity) => {
    setCart(currentCart => {
      const existingItemIndex = currentCart.findIndex((item) => {
        return item.product_id === product_id;
      });

      if (-1 < existingItemIndex) {
        if (0 < quantity) {
          return currentCart.setIn([existingItemIndex, "quantity"], quantity);
        }
        return currentCart.filter((item) => { item.product_id != product_id });
      }
      return currentCart;
    });
  };

  const deleteCartItem = (product_id) => {
    setCart((currentCart) => {
      return currentCart.filter((item) => { return item.product_id != product_id });
    });
  };

  const setCartContent = (content) => {
    setCart(Immutable(content));
  };

  return { getCart, getCartTotal, addToCart, modifyCart, deleteCartItem, setCartContent};
};