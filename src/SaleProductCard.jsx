import React from "react";

const SaleProductCard = (props) => {
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/*<!-- Sale badge-->*/}
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
        {/*<!-- Product image--> */}
        <img
          className="card-img-top"
          src={[props.imageUrl]}
          alt={props.productName} />
        {/*<!-- Product details-->*/}
        <div className="card-body p-4">
          <div className="text-center">
            {/*<!-- Product name-->*/}
            <h5 className="fw-bolder">{prop.name}</h5>
            {/*<!-- Product price-->*/}
            {prop.price}
          </div>
        </div>
        {/*<!-- Product actions-->*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
        </div>
      </div>
    </div>
  );
}

export default SaleProductCard;