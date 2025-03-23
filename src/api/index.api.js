const backendURL = process.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
  getAllProducts: {
    url: `${backendURL}/api/get-products`,
    method: "GET",
  },

  addProduct: {
    url: `${backendURL}/api/add-product`,
    method: "POST",
  },

  updateProduct: {
    url: `${backendURL}/api/update-product/:id`,
    method: "PUT",
  },
};

export default SummaryApi;
