import { atom, useAtom } from "jotai";
import Immutable  from "seamless-immutable";

const shoppingCart = Immutable ([
  {
    "id": 1,
    "product_id": 1,
    "quantity": 10,
    "productName": "Organic Green Tea",
    "price": 12.99,
    "imageUrl": "https://picsum.photos/id/225/300/200",
    "description": "Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
  },
  {
    "id": 2,
    "product_id": 1111,
    "quantity": 10,
    "productName": "Organic Black Tea",
    "price": 12.99,
    "imageUrl": "https://picsum.photos/id/225/300/200",
    "description": "Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
  },
  {
    "id": 3,
    "product_id": 11555,
    "quantity": 10,
    "productName": "Organic White Tea",
    "price": 12.99,
    "imageUrl": "https://picsum.photos/id/225/300/200",
    "description": "Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
  }
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

  return { getCart, getCartTotal, addToCart, modifyCart, deleteCartItem };
};