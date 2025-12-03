import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/ProductSlice'
import { mockData } from '../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'

export default function BestSeller() {
    const dispatch = useDispatch()
    const products = useSelector((state)=>state.product)

    useEffect(()=>{
        dispatch(setProducts(mockData))
    }, [])

    const bestSellersProducts = products.products.filter((item)=>item.bestseller === true)

    const navigate = useNavigate()

  return (
    <div className="w-full">
            
            {/* Heading Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5 text-center">
                <h2 className="text-2xl md:text-3xl  text-gray-500">
                    BEST <span className="text-black">SELLERS</span>
                </h2>

                {/* Right side border line */}
                <p className="w-20 h-0.5 bg-gray-700 mx-auto md:mx-0"></p>
            </div>

            <p className="text-gray-600 text-center px-4 mb-8 text-sm md:text-base">
                Explore the best-selling products chosen by our customers.
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {bestSellersProducts.slice(0,6).filter((_,index)=>index !== 1).map((product) => (
                    <div 
                        key={product._id}
                        onClick={()=>navigate(`product/${product._id}`)}
                        className="group rounded p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                    >

                        {/* Image Box */}
                        <div className="w-full h-40 sm:h-48 md:h-52 overflow-hidden rounded-lg">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all"
                            />
                        </div>

                        {/* Product Info */}
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
