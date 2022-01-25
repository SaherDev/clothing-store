import React from "react";
import "./product.css";
import Chart from "../../components//chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useProductStats } from "../../hooks/useProductStats";
import { Link, useLocation } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const { productStats, getStats } = useProductStats();
  useEffect(() => {
    getStats(productId);
  }, [getStats, productId]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">מוצר</h1>
        <Link to="/newproduct">
          <button className="productAddButton">הוספה</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productStats} dataKey="Sales" title="מכירות" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">מזהה:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">במלאי:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>שם מוצר</label>
            <input type="text" placeholder={product.title} />
            <label>תיאור</label>
            <input type="text" placeholder={product.desc} />
            <label>מחיר</label>
            <input type="text" placeholder={product.price} />
            <label>במלאי</label>
            <select name="inStock" id="idStock">
              <option value="true">כן</option>
              <option value="false">לא</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">עדכן</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
