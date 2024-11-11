import React from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";
import RatedSaleProductCard from "./RatedSaleProductCard";
import SaleProductCard from "./SaleProductCard";
import PopularProductCard from "./PopularProductCard";

function Home() {
  return (<>
    <Header title="Shop in style!" subtitle="Exciting products just for you!"/>
    <section className="py-5">
    <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          <ProductCard
            imageUrl="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            productName="Fancy Product"
            price="$40.00 - $80.00"
          />
          <RatedSaleProductCard
            imageUrl="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            productName="Special Product"
            price="$20.00"
            salePrice="$18.00"
          />
          <SaleProductCard
            imageUrl="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            productName="Sale Product"
            price="$50.00"
            salePrice="$20.00"
          />
          <PopularProductCard
            imageUrl="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            productName="Popular Item"
            price="$40.00"
          />
        </div>
      </div>
    </section >
  </>);
}

export default Home;