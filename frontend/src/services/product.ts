import axios from 'axios'

export type ProductToCreateType = {
  sku: string;
  name: string;
  price: number;
  size?: number;
  dimensions?: string;
  weight?: number;
}

const baseUrl = 'https://boracic-tender.000webhostapp.com/products'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createProduct = async (data: ProductToCreateType): Promise<string> => {
  const res = await axios.post(baseUrl, data)
  return res.data
}

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}
