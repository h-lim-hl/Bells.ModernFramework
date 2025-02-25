import { atom, useAtom } from "jotai";

export const inventoryAtom = atom({
  "inventory" : []
});

export const useInventory = () => {
  const [inventory, setInventory] = useAtom(inventoryAtom);

  const saveInventory = (newInventory) => {
    setInventory(newInventory);
  };

  const getInventory = () => { return inventory };

  return {saveInventory, getInventory};
}