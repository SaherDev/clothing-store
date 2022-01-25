import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utils/firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: [downloadURL], categories: cat };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">מוצר חדש</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>תמונה</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>כותרת</label>
          <input
            name="title"
            type="text"
            placeholder="black jeans"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>תיאור</label>
          <input
            name="desc"
            type="text"
            placeholder="תיאור..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>מחיר</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>קטגוריה</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>במלאי</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">כן</option>
            <option value="false">לא</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          {isLoading ? "טוען ..." : "הוספה"}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
