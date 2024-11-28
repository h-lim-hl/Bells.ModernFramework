import { atom, useAtom } from "jotai";
import axios from "axios";
import Immutable from "seamless-immutable";
import { useEffect, useRef } from "react";
import { useJwt } from "./UserStore";

const shoppingCart = Immutable([]);

export const cartAtom = atom(shoppingCart);
export const cartLoadingAtom = atom(false);

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
  const { getJwt } = useJwt();

  const isInitialLoad = useRef(true);

  const updateCart = async () => {
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

    const debounceTimeout = setTimeout(() => {
      updateCart();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [cart]);

  const modifyCart = (product_id, quantity) => {
    // console.log("111: ", product_id," | ", quantity);
    setCart(currentCart => {
      // console.log("currectCart: ", currectCart);
      const existingItemIndex = currentCart.findIndex((item) => {
        return item.product_id === product_id;
      });
      // console.log("existingItemIndex: ", existingItemIndex);

      if (-1 < existingItemIndex) {
        if (0 < quantity) {
          return currentCart.setIn([existingItemIndex, "quantity"], quantity);
        }
        return currentCart.filter((item) => { return item.product_id != product_id });
      }
      return currentCart;
    });
  };

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


  const deleteCartItem = (product_id) => {
    setCart((currentCart) => {
      return currentCart.filter((item) => { return item.product_id != product_id });
    });
  };

  const fetchCart = async () => {
    const jwt = getJwt();
    setIsLoading(true);
    try {
      console.log(`${import.meta.env.VITE_API_URL}/api/cart`);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
        }
      )
      console.log("22: ", response.data);
      setCart(Immutable(response.data));
    } catch (error) {
      console.error("Error fetching cart: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getCartTotal = () => {
    let total = cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0);
    return total;
  };

  const getCart = () => { return cart };

  return {
    getCart,
    getCartTotal,
    addToCart,
    modifyCart,
    deleteCartItem,
    fetchCart,
    isLoading
  };
};