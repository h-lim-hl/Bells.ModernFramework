import React, { useEffect, useRef, useState } from "react";
import { useCart } from "./StoreCart";
import { useJwt } from "./UserStore";
import axios from "axios";


const ShoppingCart = () => {
  const { cart, getCartTotal, modifyCart, deleteCartItem } = useCart();
  const { getjwt } = useJwt();
  const [isUpdating, setIsUpdating] = useState(false);
  const isFirstRender = useRef(true);

  const fetchCart = async ()=> {
    const jwt = getJwt();
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/cart",
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      console.log("Cart: ", response.data);
    } catch (err) {
      console.error("Error fetching cart: ", err);
    }
  }

  useEffect(()=>{
    fetchCart();
    return ()=>{console.log("cleanup");}
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
      )
    }
  }

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
                  <h5>{item.productName}</h5>
                  <img src={item.imageUrl} />
                  <div className="d-flex align-items-center mt-2">
                    <input type="button"
                      className="btn btn-sm btn-secondary me-2"
                      value="-"
                      onClick={() => {
                        modifyCart(item.product_id, item.quantity - 1)
                      }}
                    />
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <input type="button"
                      className="btn btn-sm btn-secondary ms-2"
                      value="+"
                      onClick={() => {
                        modifyCart(item.product_id, item.quantity + 1)
                      }}
                    />
                    <button className="btn btn-sm btn-danger ms-2"
                      onClick={() => {
                        deleteCartItem(item.product_id)
                      }}
                    >Delete</button>
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
        <h4>Total: ${getCartTotal().toFixed(2)}</h4>
      </div>
    </div>
  </>)
}

export default ShoppingCart;