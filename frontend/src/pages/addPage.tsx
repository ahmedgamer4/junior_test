import { useAtom } from "jotai"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { productsAtom } from "../contexts/global"
import { useToast } from "../hooks/use-toast"
import { createProduct } from "../services/product"

const AddPage = () => {
  const queryClient = useQueryClient()

  const newProductMutation = useMutation(createProduct, {
    onSuccess: () => queryClient.invalidateQueries('products'),
  })

  const navigate = useNavigate()
  const [sku, setSku] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [productType, setProductType] = useState('empty')
  const [size, setSize] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')

  const [products,] = useAtom(productsAtom)
  const { toast } = useToast()

  const addProduct = async () => {
    const productToCreate = {
      sku,
      name,
      price: Number(price),
      size: Number(size),
      weight: Number(weight),
      dimensions: height ? `${height}x${width}x${length}` : '',
    }

    const skuExist = products.some(p => p.sku === sku)

    if (!name || !sku || !price || skuExist) {
      toast({
        title: 'Invalid Data',
        description: 'Please, provide the data of indicated type',
      })
      return
    }

    newProductMutation.mutate(productToCreate)
    navigate('/')
  }

  return (
    <main className="min-h-screen">
      <nav className='sm:flex justify-between border-b border-gray-500 py-4'>
        <h1 className='text-2xl font-bold text-slate-100'>Product Add</h1>
        <div className='mt-4 sm:m-0 flex gap-4 text-sm'>
          <Button onClick={addProduct} variant={"subtle"}>Save</Button>
          <Link to='../'>
            <Button className="text-slate-100 hover:text-slate-900" id='delete-product-btn' variant={'outline'}>CANCEL</Button>
          </Link>
        </div>
      </nav>

      <form id="product_form" className="text-slate-100 mt-9 sm:max-w-lg">
        <label htmlFor="sku" className="sm:flex block mt-4 gap-16 items-center">
          <p>SKU</p>
          <Input
            required
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            type='text' className="mt-2 sm:m-0" placeholder="kjf-kdj-jfj" />
        </label>

        <label htmlFor="name" className="sm:flex block mt-4 gap-16 items-center">
          <p>Name</p>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text' className="mt-2 sm:m-0" placeholder="name" />
        </label>

        <label htmlFor="price" className="sm:flex block mt-4 gap-16 items-center">
          <p>Price($)</p>
          <Input
            id="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 sm:m-0" type='number' />
        </label>

        <label htmlFor="productType" className="sm:flex block mt-4 gap-16 items-center">
          <p>Type Switcher</p>
          <select
            required
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            id="productType" className="bg-transparent border text-sm
            rounded-lg ring-slate-100 block w-full p-2.5
             placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-slate-100">
            <option disabled value="empty">Please choose an option</option>
            <option value="DVD">DVD</option>
            <option value="Furniture">Furniture</option>
            <option value="Book">Book</option>
          </select>
        </label>

        {
          productType === 'DVD' &&
          <div className="mt-10">
            <label htmlFor="size" className="sm:flex block mt-4 gap-16 items-center">
              <p>Size(MB)</p>
              <Input
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-2 sm:m-0" type='number'
                required
              />
            </label>
            <p className="mt-6">Please, provide size in MB</p>
          </div>
        }

        {
          productType === 'Book' &&
          <div className="mt-10">
            < label htmlFor="weight" className="sm:flex block mt-4 gap-16 items-center">
              <p>Weight(KG)</p>
              <Input
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2 sm:m-0" type='number'
                required
              />
            </label>
            <p className="mt-6">Please, provide weight in KG</p>
          </div>
        }

        {
          productType === 'Furniture' &&
          <div className="mt-10">
            <label htmlFor="height" className="sm:flex block mt-4 gap-16 items-center">
              <p>Height(CM)</p>
              <Input
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="mt-2 sm:m-0" type='number' />
            </label>

            <label htmlFor="width" className="sm:flex block mt-4 gap-16 items-center">
              <p>Width(CM)</p>
              <Input
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
                className="mt-2 sm:m-0" type='number' />
            </label>

            <label htmlFor="length" className="sm:flex block mt-4 gap-16 items-center">
              <p>Length(CM)</p>
              <Input
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
                className="mt-2 sm:m-0" type='number' />
            </label>
            <p className="mt-6">Please, provide dimensions</p>
          </div>
        }

      </form>
    </main >
  )
}

export default AddPage
