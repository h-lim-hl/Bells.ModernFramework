import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserLogin() {
  const [discounts, setDiscounts] = useState([]);
  const [showDiscountEdit, setShowDiscountEdit] = useState(false);
  const [editDiscountId, setEditDiscountId] = useState(0);

  useEffect(() => {
    const fetchDiscountListings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/discounts/all`);
        setDiscounts(response.data);
      } catch (err) {
        console.error("Error fetching Discount Listings");
      };
    };
    fetchDiscountListings();
  }, []);

  const renderDiscountListings = () => {
    const discountListings = [];
    let count = 0;
    for (const discount of discounts) {
      discountListings.push(
        <li className="list-group-item d-flex">
          <div className="p-2 text-start">
            {`Hello World ${count}`}
          </div>
          <div className="p-2 text-end">
            <button className="btn btn-primary m-1" onClick={toggleOverlay}>
              Edit
            </button>
          </div>
        </li>
      );
    }

    return discountListings;
  }

  return (
    <div className="container mt-5">
      <h2>Discounts Listings</h2>
      <div>
        <ul className="list-group">
          {renderDiscountListings()}
        </ul>
      </div>
    </div>
  );
}

export default UserLogin;