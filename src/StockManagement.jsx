import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInventory } from "./InventoryStore";
import StockCard from "./StockCard";

function StockManagement() {
  const { saveInventory, getInventory } = useInventory();
  const inventory = getInventory();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/stock/levels`);
        saveInventory(response.data);
      } catch (err) {
        console.error("Error fetching inventory: ", err);
      }
    };
    fetchInventory();
  }, [inventory]);

  const renderInventory = () => {
    const inventoryElements = [];
    for (const inventoryItem of inventory) {
      inventoryElements.push(
        <div key={inventoryItem.id} className="col-md-3 mb-4">
          <StockCard
            id={inventoryItem.id}
            imageUrl={inventoryItem.imageUrl}
            productName={inventoryItem.name}
            price={inventoryItem.price}
            store={inventoryItem.store}
            reserved={inventoryItem.reserve}
          />
        </div>
      );
    }
  };

  return (<>
    <Header title="Stock Management" subtitle="" />
    <section className ="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {renderInventory()}
          </div>
        </div>
    </section>
  </>);
}

export default StockManagement;