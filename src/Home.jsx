import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import ProductCard from "./ProductCard";  
import RatedSaleProductCard from "./RatedSaleProductCard";
import SaleProductCard from "./SaleProductCard";
import PopularProductCard from "./PopularProductCard";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error)
      }
    };
    fetchFeaturedProducts();
  }, []);

  const renderFeaturedProducts = () => {
    const productElements = [];
    for(const product of featuredProducts) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <ProductCard
            id={product.id}
            imageUrl={product.image}
            productName={product.name}
            price={product.price}
            product_id={product.id}
          />
        </div>
      )
    }
    return productElements;
  };

  return (<>
    <Header title="Shop in style!" subtitle="Exciting products just for you!" />
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {renderFeaturedProducts()}
        </div>
      </div>
    </section >
  </>);
}

export default Home;