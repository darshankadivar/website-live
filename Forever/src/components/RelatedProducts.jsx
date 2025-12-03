import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/ProductSlice'
import { mockData } from '../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'

export default function RelatedProducts({ category, subCategory }) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product)

  const navigate = useNavigate()

  const [related, setRelated] = useState([])

  useEffect(() => {
    dispatch(setProducts(mockData))
  }, [])

  useEffect(() => {
    if (products.products.length > 0) {
      let productsCopy = products.products.slice()

      productsCopy = productsCopy.filter((item) => category == item.category)
      productsCopy = productsCopy.filter((item) => subCategory == item.subCategory)

      setRelated(productsCopy.slice(0, 5));
    }
  }, [])
  return (
    <div className="w-full py-18">
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5 text-center">
                <h2 className="text-2xl md:text-3xl  text-gray-500">
                    RELATED <span className="text-black">COLLECTION</span>
                </h2>

                <p className="w-20 h-0.5 bg-gray-700 mx-auto md:mx-0"></p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {related.map((product,index) => (
                    <div 
                        key={index}
                        onClick={()=> { scrollTo({top:0, behavior:"smooth"}) 
                                        navigate(`/product/${product._id}`)}}
                        className="group rounded p-4  shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                    >
        
                        <div className="w-full h-40 sm:h-48 md:h-52 overflow-hidden rounded-lg">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all"
                            />
                        </div>

                        <div className="mt-3">
                            <h3 className="text-sm md:text-base  text-gray-900">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base mt-1">
                                ${product.price}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </div>

  )
}
