import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Please enter name...")
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\s]+$/g, {
        message: "Please enter valid product name...",
      }),
    price: yup
      .number()
      .typeError("Please enter a valid price...")
      .required("Please enter valid price..."),
    category: yup
      .string()
      .required("Please enter category...")
      .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, {
        message: "Please enter valid category...",
      }),
    company: yup
      .string()
      .required("Please enter company name")
      .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, {
        message: "Please enter valid company name...",
      }),
  })
  .required();

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  // eslint-disable-next-line  
  const [data, setData] = useState("");

  const onSubmit = async (info) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    info.userId = userId;
    console.log(info, "info");
    setData(JSON.stringify(info));
    let result = await fetch("http://localhost:4000/add-product", {
      method: "post",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result, "result");
    reset(); // Clear the form fields
  };
//   console.log(data, "product");
  return (
    <div className="sign-up-form-container">
      <div className="form-card-container">
        <h1>Add Product</h1>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("name")}
              placeholder="Enter Product Name"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("price")}
              placeholder="Enter Price"
            />
            <p>{errors.price?.message}</p>
          </div>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("category")}
              placeholder="Enter Category"
            />
            <p>{errors.category?.message}</p>
          </div>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("company")}
              placeholder="Enter Company Name"
            />
            <p>{errors.company?.message}</p>
          </div>

          <input className="btn-signup" type="submit" value="Add Product" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
