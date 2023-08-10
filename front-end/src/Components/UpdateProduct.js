import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

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
  ;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(schema)
  });

  // eslint-disable-next-line
  const [data, setData] = useState("");
  const params = useParams();

  useEffect(() => {
    console.log(params);
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4000/product/${params.id}`);
    result = await result.json();
    setData(result);
  };

  console.log(data, "data");

  const updateProductDetails = async (info) => {
    console.log(info, "update");
    let result = await fetch(`http://localhost:4000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    setData(JSON.stringify(info));
      navigate("/");
    reset(); // Clear the form fields
  };
  //   console.log(data, "product");
  return (
    <div className="sign-up-form-container">
      <div className="form-card-container">
        <h1>Update Product Details</h1>
        <form
          className="sign-up-form"
          onSubmit={handleSubmit(updateProductDetails)}
        >
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("name")}
              defaultValue={data.name}
              placeholder="Enter Product Name"
            />
            {touchedFields.name && <p>{errors.name?.message}</p>}
          </div>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("price")}
              defaultValue={data.price}
              placeholder="Enter Price"
            />
            {touchedFields.price && <p>{errors.price?.message}</p>}
          </div>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("category")}
              defaultValue={data.category}
              placeholder="Enter Category"
            />
            {touchedFields.category && <p>{errors.category?.message}</p>}
          </div>
          <div className="input-signup-container">
            <input
              type="text"
              className="input-signup"
              {...register("company")}
              defaultValue={data.company}
              placeholder="Enter Company Name"
            />
            {touchedFields.company && <p>{errors.company?.message}</p>}
          </div>

          <input className="btn-signup" type="submit" value="Update Product" />
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
