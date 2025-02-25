import { atom, useAtom } from "jotai";

export const stockEditAtom = atom({
  "flag": false,
  "stockDetails" : {}
});

export const useStockEditAtom = () => {
  const [stockEdit, setStockEdit] = useAtom(stockEditAtom);

  const saveStockEditAtom = (data) => { setStockEditFlag(data); };
  const getStockEditAtom = () => stockEditFlag;

  return { saveStockEditAtom, getStockEditAtom};
};