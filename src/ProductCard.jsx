import React from "react";
import { useCart } from "./StoreCart"
import { useLocation } from "wouter";
import {useFlashMessage} from "./FlashMessageStore";

const ProductCard = (prop) => {
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const handleAddToCart = () => {
    addToCart(prop);
    showMessage("Item added to cart", "success");
    setLocation("/cart");
  };

  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/*<!-- Product image--> */}
        <img
          className="card-img-top"
          src={prop.imageUrl}
          alt={prop.productName} />
        {/*<!-- Product details-->*/}
        <div className="card-body p-4">
          <div className="text-center">
            {/*<!-- Product name-->*/}
            <h5 className="fw-bolder">{prop.productName}</h5>
            {/*<!-- Product price-->*/}
            {prop.price}
          </div>
        </div>
        {/*<!-- Product actions-->*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <a className="btn btn-outline-dark mt-auto"
              href="#"
              onClick={()=>{addToCart(prop)}}>
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;