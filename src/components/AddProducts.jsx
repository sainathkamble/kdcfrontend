import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa";
import products from "../data/products";
import SummaryApi from "../api/index.api";

const AddProducts = ({ setShowAddProducts }) => {
  const initialProductName = Object.keys(products)[0]; // Get the first product
  const initialMaterial = Object.keys(products[initialProductName])[0]; // Get the default material for the first product

  const [selectedProduct, setSelectedProduct] = useState(
    products[initialProductName]
  );
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [productName, setProductName] = useState(initialProductName);
  const [selectedGrades, setSelectedGrades] = useState({
    productName: initialProductName,
    material: initialMaterial,
    grades: [],
    price: "",
    details: {
      shape: "",
      thickness: "",
      surfaceFinish: "",
      length: "",
      outsideDiameter: "",
    },
  });

  useEffect(() => {
    // Set initial state when the component mounts
    setSelectedProduct(products[initialProductName]);
    setSelectedMaterial(initialMaterial);
    setSelectedGrades({
      productName: initialProductName,
      material: initialMaterial,
      grades: [], // Initialize with empty grades
    });
  }, [initialProductName, initialMaterial]);

  const handleProductClick = (product) => {
    setSelectedProduct(products[product]);
    setProductName(product);
    setSelectedMaterial(Object.keys(products[product])[0]); // Set default material
    setSelectedGrades({
      productName: product,
      material: Object.keys(products[product])[0],
      grades: [], // Reset grades when product changes
    });
  };

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
    setSelectedGrades((prev) => ({
      ...prev,
      material: material,
      grades: [], // Clear grades when material changes
    }));
  };

  const getGradesForMaterial = (material) => {
    return selectedProduct && selectedProduct[material]
      ? selectedProduct[material]
      : [];
  };

  const handleGradeSelection = (grade) => {
    setSelectedGrades((prev) => {
      const isGradeSelected = prev.grades.includes(grade);
      if (isGradeSelected) {
        // Remove grade if it's already selected
        return {
          ...prev,
          grades: prev.grades.filter((g) => g !== grade),
        };
      } else {
        // Add grade if it's not selected
        return {
          ...prev,
          grades: [...prev.grades, grade],
        };
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(SummaryApi.addProduct.url, {
        method: SummaryApi.addProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedGrades),
      });
      const responseData = await response.json();

      if (responseData.success) {
        setShowAddProducts(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
      <div className="max-w-4xl w-full max-h-[90vh] h-full rounded-md shadow-md bg-white py-2 px-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Add Products</h1>
          <div className="flex items-center gap-2 text-blue-500 text-xl">
            <p>
              {selectedGrades.grades.length}/{Object.keys(products).length}{" "}
              Products Selected
            </p>
            <span
              className="hover:text-red-500 cursor-pointer p-2"
              onClick={() => setShowAddProducts(false)}
            >
              <ImCancelCircle />
            </span>
          </div>
        </div>
        <hr className="border-gray-600 my-2" />
        <div className="flex gap-2">
          <div className="w-1/3">
            <div className="bg-gray-200 w-full py-1 pl-1 rounded">
              <strong>Products</strong>
            </div>
            <div className="w-full border border-b-1 border-gray-600 rounded-full mt-1"></div>
          </div>
          <div className="w-1/3">
            <div className="bg-gray-200 w-full py-1 pl-1 rounded">
              <strong>Material</strong>
            </div>
            <div className="w-full border border-b-1 border-gray-600 rounded-full mt-1"></div>
          </div>
          <div className="w-1/3">
            <div className="bg-gray-200 w-full py-1 pl-1 rounded">
              <strong>Grades</strong>
            </div>
            <div className="w-full border border-b-1 border-gray-600 rounded-full mt-1"></div>
          </div>
        </div>
        <div className="flex gap-2 w-full h-[calc(100%-150px)] mt-2">
          <div className="w-1/3 bg-white border rounded overflow-y-scroll px-1 scrollbar-stylish">
            <div className="cursor-pointer">
              {Object.keys(products).map((product, index) => (
                <div
                  className="py-2 pl-1 shadow-sm bg-gray-100 my-2 flex justify-between items-center"
                  key={index + product}
                  onClick={() => handleProductClick(product)}
                >
                  <p>{product}</p>
                  {products[product] === selectedProduct && (
                    <span className="mr-1 text-gray-600">
                      <FaAngleRight />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3 bg-white border rounded overflow-y-scroll px-1 scrollbar-stylish">
            {selectedProduct && (
              <div className="cursor-pointer">
                {Object.keys(selectedProduct).map((material, index) => (
                  <div
                    className="py-2 pl-1 shadow-sm bg-gray-100 my-2 flex justify-between items-center"
                    key={index + material}
                    onClick={() => handleMaterialClick(material)}
                  >
                    <p>{material}</p>
                    {material === selectedMaterial && (
                      <span className="mr-1 text-gray-600">
                        <FaAngleRight />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-1/3 bg-white border rounded overflow-y-scroll px-1 scrollbar-stylish">
            {selectedMaterial && (
              <div>
                {getGradesForMaterial(selectedMaterial).map((grade, index) => (
                  <div
                    className="py-2 pl-1 shadow-sm bg-gray-100 my-2 flex justify-between items-center"
                    key={index + grade}
                  >
                    <p>
                      {selectedMaterial} {grade} {productName}
                    </p>
                    <input
                      className="w-4 h-4 mr-2 cursor-pointer"
                      type="checkbox"
                      checked={selectedGrades.grades.includes(grade)}
                      onChange={() => handleGradeSelection(grade)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-2">
          <button
            onClick={handleSubmit}
            className="text-white py-2 text-lg px-20 rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 font-bold transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
