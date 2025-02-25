import React, { useEffect } from "react";
import { useStockEditAtom } from "./StockEditAtom";

const StockCard = (prop) => {
  const { saveStockEditAtom } = useStockEditAtom();

  function editStock(prop) {
    saveStockEditAtom({
      "flag" : true,
      "stockDetails" : prop
    })
  };

  useEffect(() => {
  }, [stockEditFlag]);

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
            {/*<!-- Store levels-->*/}
            {prop.numStore}
            {/*<!-- Reserved -->*/}
            {prop.numReserved}
          </div>
        </div>
        {/*<!-- Product actions-->*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <a className="btn btn-outline-dark mt-auto"
              href="#"
              onClick={() => { editStock(prop) }}>
              Edit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}