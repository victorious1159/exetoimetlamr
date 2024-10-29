import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllCombos } from "../../admin/combos/FecthApi";

const SingleCombo = (props) => {
  const [comboData, setComboData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCombos();
      setComboData(responseData.combos || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {comboData.length > 0 ? (
        comboData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="relative col-span-1 m-2 mb-5 bg-white item-single">
                {/* Combo image */}
                <img
                  className="w-full h-32 object-cover"
                  src={
                    item.comboImage ||
                    "https://i5.walmartimages.com/seo/50ea-11-1-4-X-8-5-8-X-2-1-4-Blue-Corrugated-Tuck-Top-Box-by-Paper-Mart_4a11a76b-9f4b-469f-8b0b-07c1392f8f03.0bf86223473a07dedefff9abeacd7c24.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
                  }
                  alt={item.comboName}
                />
                <div className="p-3">
                  <div className="flex items-center justify-between mt-2">
                    <div
                      className="text-gray-600 font-light truncate cursor-pointer"
                      onClick={() => {
                        history.push(`/combo/${item._id}`);
                      }}
                    >
                      {item.comboName}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>
                        <svg
                          className="w-4 h-4 fill-current text-yellow-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">
                        {item.comboReviews.length}
                      </span>
                    </div>
                  </div>
                  <div>{item.comboPrice}₫</div>
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center text-2xl">
          <div className="text-2xl text-center">
            <div className="flex flex-col items-center justify-center">
              <img
                className=""
                src="./image/NoFoundProductInWishlist.gif"
                alt="No combo available"
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SingleCombo;
