import { atom } from "jotai";
import { ProductToCreateType } from "../services/product";


export type ProductType = {
  id: string;
} & ProductToCreateType

export const productsAtom = atom<ProductType[]>([])
