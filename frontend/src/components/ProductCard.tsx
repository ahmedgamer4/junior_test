import React from "react"
import { useEffect, useState } from "react"
import { Checkbox } from "./Checkbox";

export type ProductType = {
  sku: string;
  id: string;
  name: string;
  price: number;
  size?: number;
  dimensions?: string;
  weight?: number;
  checkedProducts: string[];
}

export type ProductCardProps = {
  setCheckedProducts: React.Dispatch<React.SetStateAction<string[]>>
} & ProductType

const ProductCard = ({ checkedProducts, sku, name, price, size, weight, dimensions, id, setCheckedProducts }: ProductCardProps) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!checked) {
      setCheckedProducts((prev) => prev.filter((i) => i !== id))
    }
  }, [checked])

  useEffect(() => {
    if (checkedProducts.includes(id)) {
      return
    }
    if (checked) setCheckedProducts((prev) => [...prev, id])
  }, [checked])


  return (
    <div className='bg-slate-100 min-w-[200px] rounded-md p-5 flex flex-col justify-center items-center'>
      <div className='flex justify-start w-full'>
        <Checkbox className='delete-checkbox'
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
      </div>
      <p>{sku}</p>
      <p>{name}</p>
      <p>{price} $</p>
      {
        size ? <p>Size: {size} MB</p> : null

      }

      {
        dimensions ? <p>Dimensions: {dimensions}</p> : null
      }

      {
        weight ? <p>Weight: {weight} KG</p> : null
      }

    </div>
  )
}

export default ProductCard
