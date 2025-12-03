import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setProducts } from '../redux/ProductSlice'
import { assets, mockData } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { addToCart } from '../redux/CartSlice'
import { toast } from 'react-toastify'

export default function Product() {
    const { productId } = useParams()

    const dispatch = useDispatch()
    const products = useSelector((state) => state.product)

    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState("")
    const [size, setSize] = useState("")
    const [cartItem, setCartItem] = useState({})

    useEffect(() => {
        dispatch(setProducts(mockData))
    }, [])

    const fetchProductData = async () => {
        products.products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [products, productId])



    return productData ? (
        <div className="border-t-2 pt-10 border-gray-400 opacity-100 transition-opacity duration-500 ease-in">

            {/* product wrapper */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* left images section */}
                <div className="w-full  lg:w-1/2 flex flex-col-reverse lg:flex-row gap-6">

                    {/* thumbnails*/}
                    <div className="flex lg:flex-col gap-4 lg:w-24 w-full overflow-x-auto lg:overflow-visible">
                        {productData.image.map((img, index) => (
                            <img
                                onClick={() => setImage(img)}
                                src={img}
                                key={index}
                                className="w-20 md:w-24 object-cover cursor-pointer hover:opacity-80 transition shrink-0"
                                alt={productData.name}
                            />
                        ))}
                    </div>

                    {/* main image */}
                    <div className="flex-1 flex justify-center items-center">
                        <img
                            src={image}
                            alt={productData.name}
                            className="w-full max-h-[550px] object-contain"
                        />
                    </div>
                </div>


                {/* product info */}
                <div className="flex-1 space-y-5">

                    <h1 className="text-3xl font-semibold">{productData.name}</h1>

                    {/* rating */}
                    <div className="flex gap-1">
                        <img src={assets.star_icon} alt="" className="w-5" />
                        <img src={assets.star_icon} alt="" className="w-5" />
                        <img src={assets.star_icon} alt="" className="w-5" />
                        <img src={assets.star_icon} alt="" className="w-5" />
                        <img src={assets.star_dull_icon} alt="" className="w-5" />
                    </div>

                    <p className="text-2xl font-bold text-orange-600">${productData.price}</p>

                    <p className="text-gray-600 leading-relaxed">{productData.description}</p>

                    {/* size selector */}
                    <div>
                        <p className="font-medium mb-2">Select Size</p>
                        <div className="flex gap-3 flex-wrap">
                            {productData.sizes.map((product, index) => (
                                <button
                                    onClick={() => setSize(product)}
                                    key={index}
                                    className={`border py-2 px-4 rounded-lg bg-gray-100 transition ${product === size
                                        ? "border-orange-500 bg-orange-100"
                                        : "hover:border-black"
                                        }`}
                                >
                                    {product}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={()=> {
                        if (!size) {
                            toast.error("Select Product Size")
                            return;
                        }
                        dispatch(addToCart({...productData, size}))
                    }} className="bg-black text-white py-3 px-7 rounded-xl hover:bg-gray-800 transition">
                        ADD TO CART
                    </button>

                    <hr />

                    <div className="text-sm text-gray-600 space-y-1">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>

                </div>
            </div>

            {/* related products */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    ) : (
        <div className="opacity-0"></div>
    );

}
