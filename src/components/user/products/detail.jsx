import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getProductById } from "../../../api/products";
import { getCategoryById } from "../../../api/categories";
import Layout from "../layouts/layout";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setProduct(product);
      const category = await getCategoryById(product.category);
      setCategoryName(category.name);
    };
    fetchProduct();
  }, [id]);

  const pageTitle = product.name;

  const handleAddToCart = () => {
    if (quantityToAdd > 0 && quantityToAdd <= product.quantity) {
      const newItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantityToAdd,
        image: product.image,
      };

      // Lấy giỏ hàng từ `sessionStorage` hoặc tạo giỏ hàng mới nếu chưa tồn tại
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cart[existingItemIndex].quantity += quantityToAdd;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        cart.push(newItem);
      }

      // Lưu giỏ hàng vào `sessionStorage`
      sessionStorage.setItem("cart", JSON.stringify(cart));

      // Cập nhật trạng thái số lượng
      const updatedProduct = { ...product };
      updatedProduct.quantity -= quantityToAdd;
      setProduct(updatedProduct);

      setQuantityToAdd(1);

      alert(`Added ${quantityToAdd} ${product.name} to Cart`);
    }
  };

  const pageContent = (
    <div className="container">
      <h2 className="text-center pb-5">{product.name}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={product.image}
            style={{ width: "400px", height: "400px" }}
            alt={product.name}
          />
        </div>
        <div className="col-7">
          <p>
            <strong>Category:</strong><a href={`/categories/${product.category}`} style={{ textDecoration: "none" }}> {categoryName}</a>
          </p>
          <p>
            <strong>Price: </strong> ${product.price}
          </p>
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p style={{ paddingBottom: "10px" }}>
            <strong>Description:</strong> {product.description}
          </p>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(Number(e.target.value))}
              style={{ marginLeft: "10px", marginRight:"20px", padding: "5px", border: "1px solid #ccc", fontSize: "15px" }}
            />
            <button type="button" class="btn btn-primary" onClick={handleAddToCart}><i class="bi bi-cart"></i> Add to cart</button>
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
};

export default DetailProduct;
