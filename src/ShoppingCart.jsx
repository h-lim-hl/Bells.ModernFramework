import React, { useEffect, useRef, useState } from "react";
import { useCart } from "./StoreCart";
import { useJwt } from "./UserStore";
import axios from "axios";


const ShoppingCart = () => {
  const { cart, getCartTotal, modifyCart, deleteCartItem, setCartContent } = useCart();
  const { getJwt } = useJwt();
  const [isUpdating, setIsUpdating] = useState(false);
  const isFirstRender = useRef(true);

  //console.log(cart);
  const fetchCart = async ()=> {
    const jwt = getJwt();
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/cart",
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      console.log("Cart: ", response.data);
      setCartContent(response.data);
    } catch (err) {
      console.error("Error fetching cart: ", err);
    }
  }

  useEffect(()=>{
    fetchCart();
    return ()=>{/*console.log("cleanup")*/;}
  }, []);

  const updateCart = async ()=>{
    setIsUpdating(true);
    const jwt = getJwt();
    try {
      const updatedCart = cart.map((item)=>({
        product_id: item.product_id,
        quantity: item.quantity
      }));

      await axios.put(import.meta.env.VITE_API_URL +"/api/cart",
        {cartItems: updatedCart }, { headers: { Authorization: `Bearer ${jwt}`} }
      );
    } catch (err) {
      console.error("Error updating cart: ", err);
    } finally {
      setUpdating(false);
    }
  };

  return (<>
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (<p>Your Cart is empty </p>) : (<>
        <ul className="list-group">
          {
            cart.map((item) => (
              <li key={item.id}
                className="list-group-item d-flex justify-content-between align-item-center">
                <div>
                  <img src={item.imageUrl} alt={item.productName} className="cart-image" />
                  <h5>{item.productName}</h5>
                  <div className="d-flex align-items-center mt-2">
                    <input type="button"
                      className="btn btn-sm btn-secondary me-2"
                      value="-"
                      onClick={() => {
                        modifyCart(item.product_id, item.quantity - 1)
                      }}
                      disabled={isUpdating}
                    />
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <input type="button"
                      className="btn btn-sm btn-secondary ms-2"
                      value="+"
                      onClick={() => {
                        modifyCart(item.product_id, item.quantity + 1)
                      }}
                      disabled={isUpdating}
                    />
                    <button className="btn btn-sm btn-danger ms-2"
                      onClick={() => {
                        deleteCartItem(item.product_id)
                      }}
                      disabled={isUpdating}
                    >Remove</button>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </>)
      }
      <div className="mt-3 text-end">
        <h4>Total: ${getCartTotal()}</h4>
      </div>
    </div>
  </>)
}

export default ShoppingCart;