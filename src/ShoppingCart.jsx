import React from "react";
import { useCart } from "./StoreCart";


export default function ShoppingCart() {
  const { getCart, getCartTotal, modifyCart, deleteCartItem } = useCart();
  const cart = getCart();
  return (<>
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (<p>Your Cart is empty </p>) : (<>
        <ul className="list-group">
          {
            cart.map((item)=> (
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