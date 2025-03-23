/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AddProducts from "./AddProducts";
import { useSelector } from "react-redux";
import { useContext } from "react";
import Context from "../contexts/context";
import products from "../data/products";
import productOptions from "../data/productOptions";

const ProductsList = () => {
  const { fetchAllProducts } = useContext(Context);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [expandedProductId, setExpandedProductId] = useState(null);

  const allProducts = useSelector((state) => state.products.products);

  const materialsList = (product) => {
    return Object.keys(products[product]);
  };

  const optionsList = (product, material) => {
    return productOptions[product][material];
  };

  useEffect(() => {
    fetchAllProducts();
  }, [showAddProducts]);

  return (
    <div className="w-full h-full min-h-screen p-6 bg-gray-100 relative">
      {/* Header Section */}
      <div className="flex justify-start gap-10 items-center mb-6">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-full text-sm hover:bg-blue-700 transition duration-300 shadow-md"
          onClick={() => setShowAddProducts(true)}
        >
          + Add Products
        </button>
        <div className="text-sm py-2 px-4 bg-white rounded-full shadow-md flex items-center gap-2">
          <strong>280/400</strong> <span>Products</span>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="max-w-lg w-full flex rounded-lg shadow-md bg-white border border-gray-300 mb-6">
        <input
          type="text"
          className="w-full h-full rounded-l-lg px-4 py-2 border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Products Here..."
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-r-lg text-sm hover:bg-blue-700 transition duration-300">
          Search
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddProducts && (
        <AddProducts setShowAddProducts={setShowAddProducts} />
      )}

      {/* Product List Section */}
      <div className="w-full h-fit">
        <div className="w-full h-full">
          <div className="w-full flex items-center justify-between gap-2 p-1 bg-sky-300">
            <div className="flex items-center gap-2 text-lg basis-[27%] border-black border-r-2 p-2">
              <input type="checkbox" className="w-4 h-4" />
              <strong>Products</strong>
            </div>
            <div className="flex items-center gap-2 text-lg basis-[27%] border-black border-r-2 p-2">
              <strong>Action</strong>
            </div>
            <div className="flex items-center gap-2 text-lg basis-[27%] border-black border-r-2 p-2">
              <strong>Product Details</strong>
            </div>
            <div className="flex items-center gap-2 text-lg basis-[15%] p-2">
              <strong>Price in Unit</strong>
            </div>
          </div>
        </div>
        {allProducts &&
          allProducts.map((product, index) => (
            <div key={index + product?._id} className="w-full h-full relative">
              {expandedProductId !== product._id && (
                <div className="w-full flex items-center justify-between gap-2 p-1">
                  <div className="flex items-center gap-2 text-lg basis-[27%] p-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <p>
                      {product?.material} {product?.grades[0]}{" "}
                      {product?.productName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm basis-[27%] p-2">
                    <button
                      className="text-blue-500 hover:underline hover:font-semibold transition"
                      onClick={() =>
                        setExpandedProductId(
                          expandedProductId === product._id ? null : product._id
                        )
                      }
                    >
                      Quick Edit
                    </button>
                    <button
                      className="text-blue-500 hover:underline hover:font-semibold transition"
                      onClick={() =>
                        setExpandedProductId(
                          expandedProductId === product._id ? null : product._id
                        )
                      }
                    >
                      Add Product Details
                    </button>
                  </div>
                  <div className="text-sm basis-[27%] p-2">
                    <p>
                      <strong>Material:</strong> {product?.material}
                    </p>
                    <p>
                      <strong>Unit Length:</strong> {product?.details?.length}
                    </p>
                    <p>
                      <strong>Shape:</strong> {product?.details?.shape}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-lg basis-[15%] p-2">
                    <p>{product?.price}</p>
                  </div>
                </div>
              )}
              {expandedProductId === product._id && (
                <div className=" bg-gray-300 border-t border-gray-300 px-10">
                  <div className="p-2 border border-gray-300 rounded-md shadow-sm">
                    <div className="w-full">
                      <p className="text-lg font-semibold mb-2">Quick Edit</p>
                      <div className="max-w-2xl w-full flex justify-between items-center">
                        <p>
                          Title: {product?.material} {product?.grades[0]}{" "}
                          {product?.productName}
                        </p>
                        <div className="flex items-center gap-2">
                          <span>Price *</span>
                          <div>
                            <select
                              className="w-16 h-10 border-r rounded-l-full pl-2"
                              value="INR"
                            >
                              <option value="">Select</option>
                              {optionsList(product.productName, "currency").map(
                                (val, i) => (
                                  <option
                                    key={i}
                                    value={val}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
                                    }`}
                                  >
                                    {val}
                                  </option>
                                )
                              )}
                            </select>
                            <input
                              className="w-16 h-10 border-r pl-2 focus:outline-none"
                              type="text"
                              value={product?.price}
                            />
                            <select
                              className="w-16 h-10 border-r pl-2 pr-2 rounded-r-full"
                              value="KG"
                            >
                              <option value="">Select</option>
                              {optionsList(
                                product.productName,
                                "measuringUnits"
                              ).map((val, i) => (
                                <option
                                  key={i}
                                  value={val}
                                  className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                  }`}
                                >
                                  {val}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-b border-black mt-4"></div>
                    </div>
                    <div className="w-full">
                      <p className="text-lg font-semibold mb-2">
                        Product Details{" "}
                        <span className="text-red-500 font-normal text-sm">
                          (Minimum 4 fields required) *
                        </span>
                      </p>
                      <div className="w-full flex justify-between items-center">
                        <div className="w-[35%] mt-2">
                          <div className="flex justify-between items-center gap-2 mr-10">
                            <label htmlFor="">Material</label>
                            <div className="w-[65%] h-10 rounded-full bg-white px-2">
                              <select
                                className="w-full h-full bg-transparent focus-within:outline-none"
                                value={product?.material}
                              >
                                <option value="">Select</option>
                                {materialsList(product.productName).map(
                                  (material, index) => (
                                    <option
                                      key={index + material}
                                      value={material}
                                      className={`${
                                        index % 2 === 0
                                          ? "bg-gray-100"
                                          : "bg-white"
                                      }`}
                                    >
                                      {material}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-2 mr-10 mt-4">
                            <label htmlFor="">Thickness</label>
                            <div className="w-[65%] h-10 rounded-full bg-white px-2">
                              <select
                                className="w-full h-full bg-transparent focus-within:outline-none"
                                value={product?.details?.thickness}
                              >
                                <option value="">Select</option>
                                {optionsList(
                                  product.productName,
                                  "thickness"
                                ).map((val, i) => (
                                  <option
                                    key={i}
                                    value={val}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
                                    }`}
                                  >
                                    {val}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="w-[35%] mt-2">
                          <div className="flex justify-between items-center gap-2 mr-10">
                            <label htmlFor="">Shape</label>
                            <div className="w-[65%] h-10 rounded-full bg-white px-2">
                              <select
                                className="w-full h-full bg-transparent focus-within:outline-none"
                                value={product?.details?.shape}
                              >
                                <option value="">Select</option>
                                {optionsList(product.productName, "shape").map(
                                  (val, i) => (
                                    <option
                                      key={i}
                                      value={val}
                                      className={`${
                                        index % 2 === 0
                                          ? "bg-gray-100"
                                          : "bg-white"
                                      }`}
                                    >
                                      {val}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-2 mr-10 mt-4">
                            <label htmlFor="">Surface Finish</label>
                            <div className="w-[65%] h-10 rounded-full bg-white px-2">
                              <select
                                className="w-full h-full bg-transparent focus-within:outline-none"
                                value={product?.details?.surfaceFinish}
                              >
                                <option value="">Select</option>
                                {optionsList(
                                  product.productName,
                                  "surfaceFinish"
                                ).map((val, i) => (
                                  <option
                                    key={i}
                                    value={val}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
                                    }`}
                                  >
                                    {val}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="w-[35%] mt-2">
                          <div className="flex justify-between items-center gap-2 mr-10">
                            <label htmlFor="">Length</label>
                            <div className="w-[65%] h-10 rounded-full bg-white px-2">
                              <select
                                className="w-full h-full bg-transparent focus-within:outline-none"
                                value={product?.details?.length}
                              >
                                <option value="">Select</option>
                                {optionsList(product.productName, "length").map(
                                  (val, i) => (
                                    <option
                                      key={i}
                                      value={val}
                                      className={`${
                                        index % 2 === 0
                                          ? "bg-gray-100"
                                          : "bg-white"
                                      }`}
                                    >
                                      {val}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-2 mr-10 mt-4">
                            <label htmlFor="">Outside Diameter</label>
                            <div className="w-[65%] h-10 rounded-full bg-white px-2">
                              <select
                                className="w-full h-full bg-transparent focus-within:outline-none"
                                value={product?.details?.outsideDiameter}
                              >
                                <option value="">Select</option>
                                {optionsList(
                                  product.productName,
                                  "outsideDiameter"
                                ).map((val, i) => (
                                  <option
                                    key={i}
                                    value={val}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
                                    }`}
                                  >
                                    {val}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-2 pb-4 flex gap-10">
                    <button className="w-[200px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                      Update
                    </button>
                    <button
                      onClick={() => setExpandedProductId(null)}
                      className="w-[200px] bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-full"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsList;
