import React, { Fragment, useContext, useEffect } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";
import "./style.css"; 

const ProductCategory = (props) => {
  const images = [
    "./image/3.png",
    "./image/5.png",
    "./image/6.png",
    "./image/4.png",
  ];
  const { data, dispatch } = useContext(HomeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const items = document.querySelectorAll(".fade-in");
      items.forEach((item) => item.classList.add("visible"));
    }, 100); // Adds fade-in delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer border shadow-lg rounded fade-in"
          >
            <img
              className="fix-image-categories object-center cursor-pointer rounded-top image-intro scale-hover"
              src={img}
              alt={`Product ${index}`}
            />
          </div>
        ))}
      </div>
      {/* <ProductCategoryDropdown /> */}
    </Fragment>
  );
};

export default ProductCategory;
