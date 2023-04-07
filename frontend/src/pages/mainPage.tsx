import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { deleteProduct, getAll } from "../services/product"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAtom } from "jotai"
import { productsAtom } from "../contexts/global"

const MainPage = () => {
  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries('products'),
  })
  const [checkedProducts, setCheckedProducts] = useState<string[]>([])
  const [products, setProducts] = useAtom(productsAtom)

  const { isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAll,
    onSuccess: (res) => setProducts(res),
  })

  const deleteCheckedProducts = () => {
    checkedProducts
      ? checkedProducts.forEach((id) => deleteProductMutation.mutate(id))
      : null
    setCheckedProducts([])
  }

  return (
    <main className='w-full min-h-screen'>
      {
        isLoading ? <div>loading...</div> :
          <div>
            <nav className='sm:flex justify-between border-b border-gray-500 py-4'>
              <h1 className='text-2xl font-bold text-slate-100'>Product List</h1>
              <div className='mt-4 sm:m-0 flex gap-4 text-sm'>
                <Link to='/addNew'>
                  <Button variant={"subtle"}>ADD</Button>
                </Link>
                <Button id='delete-product-btn' variant={'destructive'}
                  onClick={deleteCheckedProducts}
                >MASS DELETE</Button>
              </div>
            </nav>
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-4'>
              {products!.map((product) => <ProductCard
                checkedProducts={checkedProducts}
                id={product.id}
                sku={product.sku}
                name={product.name}
                size={product.size}
                price={product.price}
                weight={product.weight}
                dimensions={product.dimensions}
                key={product.id}
                setCheckedProducts={setCheckedProducts} />)}
            </section>
          </div>
      }
    </main>
  )
}

export default MainPage
