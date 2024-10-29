import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComboById, getPaymentLink } from "../../admin/combos/FecthApi";
import { LayoutContext } from "../layout";

const ComboDetailsSection = () => {
  let { id } = useParams();
  const [detailCombo, setDetailCombo] = useState();
  const [quantity, setQuantity] = useState(1);
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://img.freepik.com/premium-psd/realistic-minimalist-gift-box-mockup-cardboard-packaging-rose-pink-color-psd-mockup-design_716440-9.jpg",
    "https://zerdio.com.vn/wp-content/uploads/2020/12/mu-luoi-trai-den-tron-9.jpg",
    "https://mubaohiemdochanoi.com/wp-content/uploads/2023/05/gang-tay-chong-nang-let-silim.jpeg",
    "https://img.lazcdn.com/g/p/ed00812cf34f8c871ea8935b7bd03041.jpg_720x720q80.jpg"
  ];

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await getComboById(id);
      setDetailCombo(res);
    } catch (error) {
      console.error("Error fetching combo data:", error);
    }
  };

  const handleCheckout = async () => {
    const orderData = {
      amountTotal: detailCombo.comboPrice * quantity,
      address: "User Address",
      phone: "User Phone",
    };

    try {
      const paymentUrl = await getPaymentLink(orderData);
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  // Automatic slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const goToNextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <Fragment>
      <section className="p-20 m-4 md:mx-12 md:my-6 bg-product-detail">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Product Information */}
          <div className="col-span-1">
            <div className="flex flex-col leading-8">
              <div className="text-2xl tracking-wider">
                {detailCombo?.comboName}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl tracking-wider text-yellow-700">
                  {detailCombo?.comboPrice * quantity}₫
                </span>
              </div>
            </div>
            <div className="my-4 md:my-6 text-gray-600">
              {detailCombo?.comboDescription}
            </div>
            <div className="my-4 md:my-6">
              <div className="flex justify-between items-center px-4 py-2 border">
                <div>Quantity</div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border border-gray-300"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    className="px-2 py-1 border border-gray-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <Fragment>
                <div
                  onClick={handleCheckout}
                  style={{ background: "#303031" }}
                  className="px-4 py-2 text-white text-center cursor-pointer uppercase"
                >
                  Check out
                </div>
              </Fragment>
            </div>
          </div>

          {/* Right Section: Image Slider */}
          <div className="col-span-1 relative flex items-center justify-center">
            <button
              onClick={goToPrevSlide}
              className="absolute left-2 z-10 text-2xl"
            >
              &lt;
            </button>
            <div className="w-full h-auto flex justify-center items-center">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-auto max-w-xs rounded-lg shadow-lg"
              />
            </div>
            <button
              onClick={goToNextSlide}
              className="absolute right-2 z-10 text-2xl"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ComboDetailsSection;
