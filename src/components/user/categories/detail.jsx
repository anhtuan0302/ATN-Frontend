import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../api/products";
import { getCategoryById } from "../../../api/categories";

const DetailCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      const category = await getCategoryById(id);
      setCategoryName(category.name);
    };

    const fetchProductsByCategory = async () => {
      const response = await getProducts();
      let filteredProducts = response.filter(product => product.category === id);

      if (sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      if (priceFilter === "0-50") {
        filteredProducts = filteredProducts.filter((product) => product.price >= 0 && product.price <= 50);
      } else if (priceFilter === "50-100") {
        filteredProducts = filteredProducts.filter((product) => product.price > 50 && product.price <= 100);
      } else if (priceFilter === "100-200") {
        filteredProducts = filteredProducts.filter((product) => product.price > 100 && product.price <= 200);
      } else if (priceFilter === "200-300") {
        filteredProducts = filteredProducts.filter((product) => product.price > 200 && product.price <= 300);
      } else if (priceFilter === "300-500") {
        filteredProducts = filteredProducts.filter((product) => product.price > 300 && product.price <= 500);
      } else if (priceFilter === "500plus") {
        filteredProducts = filteredProducts.filter((product) => product.price > 500);
      }

      setProducts(filteredProducts);
    };

    fetchCategoryInfo();
    fetchProductsByCategory();
  }, [id, sortBy, priceFilter]);

  const pageTitle = categoryName;

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const pageContent = (
    <div className="container">
      <h2 className="text-center pb-5">{categoryName}</h2>
      <div className="row">
        <div className="col-2 p-4 border" style={{ background: "white", borderRadius: "10px", marginRight: "100px" }}>
          <h5>Sort by</h5>
          <div className="form-check">
            <input
              type="radio"
              id="defaultSort"
              name="sortBy"
              value={null}
              defaultChecked
              onChange={handleSortByChange}
              className="form-check-input"
            />
            <label htmlFor="defaultSort" className="form-check-label">
              Default
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="lowToHigh"
              name="sortBy"
              value="lowToHigh"
              checked={sortBy === "lowToHigh"}
              onChange={handleSortByChange}
              className="form-check-input"
            />
            <label htmlFor="lowToHigh" className="form-check-label">
              Lowest price
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="highToLow"
              name="sortBy"
              value="highToLow"
              checked={sortBy === "highToLow"}
              onChange={handleSortByChange}
              className="form-check-input"
            />
            <label htmlFor="highToLow" className="form-check-label">
              Highest price
            </label>
          </div>
          <h5 className="pt-4">Price</h5>
          <div className="form-check">
            <input
              type="radio"
              id="allPrice"
              name="priceFilter"
              value={null}
              defaultChecked
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="defaultSort" className="form-check-label">
              All
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price0-50"
              name="priceFilter"
              value="0-50"
              checked={priceFilter === "0-50"}
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="price0-50" className="form-check-label">
              $0 - $50
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price50-100"
              name="priceFilter"
              value="50-100"
              checked={priceFilter === "50-100"}
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="price50-100" className="form-check-label">
              $50 - $100
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price100-200"
              name="priceFilter"
              value="100-200"
              checked={priceFilter === "100-200"}
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="price100-200" className="form-check-label">
              $100 - $200
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price200-300"
              name="priceFilter"
              value="200-300"
              checked={priceFilter === "200-300"}
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="price200-300" className="form-check-label">
              $200 - $300
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price300-500"
              name="priceFilter"
              value="300-500"
              checked={priceFilter === "300-500"}
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="price300-500" className="form-check-label">
              $300 - $500
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price500plus"
              name="priceFilter"
              value="500plus"
              checked={priceFilter === "500plus"}
              onChange={handlePriceFilterChange}
              className="form-check-input"
            />
            <label htmlFor="price500plus" className="form-check-label">
              $500+
            </label>
          </div>
        </div>
        <div className="col-9 p-4 border" style={{ background: "white", borderRadius: "10px" }}>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-4">
                  <a href={`/products/${product._id}`} style={{ color: "black", textDecoration: "none" }}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <h5 className="card-text pt-2" style={{ color: "red", fontSize: "18px" }}>${product.price}</h5>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Layout title={pageTitle} body={pageContent} />
    </div>
  );
}

export default DetailCategory;
