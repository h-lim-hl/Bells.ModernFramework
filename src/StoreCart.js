import { atom, useAtom } from "jotai";
import axios from "axios";
import Immutable from "seamless-immutable";
import { useEffect, useRef } from "react";
import { useJwt } from "./UserStore";

const shoppingCart = Immutable([

]);

export const cartAtom = atom(shoppingCart);
export const cartLoadingAtom = atom(false);

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
  const { getJwt } = useJwt();

  const isInitialLoad = useRef(true);

  const getCart = () => { return cart };

  const getCartTotal = () => {
    let total = cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0);
    return total;
  };

  const UpdateCart = async () => {
  
    const jwt = getJwt();
   
    setIsLoading(true);
    try {
      const updatedCartItems = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }));
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        { cartItems: updatedCartItems },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialLoad.current) { // debounce cart update to skip 1st load
      isInitialLoad.current = false;
      return;
    }

    if (isLoading) {
      return
    }

    const debounceTimeout = setTimeout(() => {
      UpdateCart();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [cart]);

  const addToCart = (product) => {
    console.log(product);
    setCart((currentCart) => {
        const existingItemIndex = currentCart.findIndex(
            (item) => item.product_id === product.product_id
        );
        console.log(existingItemIndex);
        if (existingItemIndex !== -1) {
            return currentCart.setIn(
                [existingItemIndex, "quantity"],
                currentCart[existingItemIndex].quantity + 1
            );
        } else {
            const newCartItem = {
                ...product,
                product_id: product.id,
                id: Math.floor(Math.random() * 10000 + 1),
                quantity: 1,
            };
            return currentCart.concat(newCartItem);
        }
    });
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

  const fetchCart = async () => {
    const jwt = getJwt();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.VITE_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
        }
      )
      setCart(Immutable(response.data));
    } catch (error) {
      console.error("Error fetching cart: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const setCartContent = (content) => {
    setCart(Immutable(content));
  };

  return {
    cart,
    getCart,
    getCartTotal,
    addToCart,
    modifyCart,
    deleteCartItem,
    setCartContent
  };
};