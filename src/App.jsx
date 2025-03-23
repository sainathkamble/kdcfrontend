import "./App.css";
import { useDispatch } from "react-redux";
import ProductsList from "./components/ProductsList";
import SummaryApi from "./api/index.api";
import { useEffect } from "react";
import { setProducts } from "./redux/productsSlice";
import Context from "./contexts/context";

function App() {
  const dispatch = useDispatch();

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getAllProducts.url, {
        method: SummaryApi.getAllProducts.method,
      });

      const responseData = await response.json();

      // console.log("responseData", responseData);
      if (responseData.success) {
        dispatch(setProducts(responseData.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <Context.Provider value={{ SummaryApi, fetchAllProducts }}>
      <div className="w-full h-auto bg-gray-200">
        <ProductsList />
      </div>
    </Context.Provider>
  );
}

export default App;
