// import { atom, useAtom } from "jotai";

// export const inventoryAtom = atom({});

// export const useInventory = () => {
//   const [inventory, setInventory] = useAtom(inventoryAtom);

//   const addInventoryEntry = (product_id, numGrossStock) => {
//     setInventory((inventory) => ({ ...inventory, product_id: numGrossStock }));
//   };

//   const setEntryGrossStock = (product_id, numGrossStock) => {
//     const updatedInventory = inventory;
//     setInventory(updatedInventory);
//   }

//   const clearInventory = () => {
//     setInventory({});
//   };

//   const getInventoryFromDb = (DbData) => {
//     setInventory(DbData);
//   };

//   const getInventory = () => inventory;

//   return {
//     addInventoryEntry,
//     setEntryGrossStock,
//     clearInventory,
//     getInventoryFromDb,
//     getInventory
//   };
// };
