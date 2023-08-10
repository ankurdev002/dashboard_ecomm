import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:4000/products");
    result = await result.json();
    setProducts(result);
    };
    
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:4000/product/${id}`, {
            method: "delete"
        });
        result = await result.json()
        if (result) {
            getProducts();
        }
    }
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <ul className="products">
        <li>S.no.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {products.map((item,index) => 
       
          <ul className="products" key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={()=>deleteProduct(item._id)}>DELETE</button><Link to={"/update/"+item._id}>UPDATE</Link></li>
          </ul>
       
      )}
    </div>
  );
};

export default ProductList;
