import React, { useEffect, useState } from "react";
import { assets, mockData } from "../assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/ProductSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Collection() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setProducts(mockData));
  }, []);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortType, setSortType] = useState("relavent")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")


  useEffect(() => {
    setFilteredProducts(products.products)
  }, [products])

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.products.slice();

    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory))
    }

    if (searchQuery.trim() !== "") {
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredProducts(productCopy)
  }

  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilteredProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, searchQuery])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    if (params.get("search") === "open") {
      setSearchOpen(true)
    }
  }, [location])

  return (
    <div className="w-full py-10 border-t border-gray-300">

      {searchOpen && (
            <div className="flex items-center justify-center gap-3 mb-6 w-full">
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-400 px-3 py-2 max-w-xl rounded-md text-sm shadow-sm flex-1"
              />

              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                  navigate("/collection");
                }}
                className="px-3 py-2 bg-gray-300 rounded"
              >
                ✕
              </button>
            </div>
          )}

      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT SIDE (STICKY SIDEBAR) */}
        <div className="lg:w-64 shrink-0">

          {/* Filters Heading */}
          <h2
            onClick={() => setShowFilter(!showFilter)}
            className="font-semibold text-gray-800 mb-4 flex items-center justify-between cursor-pointer lg:cursor-default"
          >
            FILTERS
            <img
              className={`h-3 lg:hidden transition-transform duration-200 ${showFilter ? "rotate-90" : ""
                }`}
              src={assets.dropdown_icon}
              alt=""
            />
          </h2>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 rounded-xl p-5 mb-4 bg-white shadow-sm transition-all duration-300 ${showFilter ? "block" : "hidden"
              } lg:block`}
          >
            <p className="text-sm font-medium text-gray-700 mb-3">CATEGORIES</p>

            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Men" className="accent-black" onChange={togglecategory} />
                Men
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Women" className="accent-black" onChange={togglecategory} />
                Women
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Kids" className="accent-black" onChange={togglecategory} />
                Kids
              </label>
            </div>
          </div>

          {/* Type Filter */}
          <div
            className={`border border-gray-300 rounded-xl p-5 bg-white shadow-sm transition-all duration-300 ${showFilter ? "block" : "hidden"
              } lg:block`}
          >
            <p className="text-sm font-medium text-gray-700 mb-3">TYPE</p>

            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Topwear" className="accent-black" onChange={toggleSubCategory} />
                Topwear
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="Bottomwear" className="accent-black" onChange={toggleSubCategory} />
                Bottomwear
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="Winterwear" className="accent-black" onChange={toggleSubCategory} />
                Winterwear
              </label>
            </div>
          </div>
          
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 w-full">

          <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-6">

            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl text-gray-500 whitespace-nowrap">
                ALL <span className="text-black">COLLECTION</span>
              </h2>

              <div className="w-20 h-0.5 bg-gray-700"></div>
            </div>

            <select onChange={(e) => setSortType(e.target.value)} className="border border-gray-400 px-3 py-2 rounded-md text-sm shadow-sm">
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>

          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={()=>navigate(`/product/${product._id}`)}
                className="group rounded p-2 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">

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
                  <h3 className="text-sm  text-gray-900">
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
      </div>
    </div>
  );
}
