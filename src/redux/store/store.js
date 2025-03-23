// /api/products
const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fetchProducts = async () => {
  const response = await fetch(`${backendUrl}/products/get-products`);
  const data = await response.json();
  console.log(data);
  // return data;
};

module.exports = fetchProducts;
