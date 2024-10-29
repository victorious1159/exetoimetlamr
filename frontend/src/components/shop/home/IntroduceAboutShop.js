import React, { Fragment, useContext, useEffect, useState } from "react";
import { HomeContext } from "./index";
import "./IntroduceAboutShop.css";

const IntroduceAboutShop = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [subTitleText, setSubTitleText] = useState("");
  const subtitle =
    "𝓣𝓱𝓮 𝓹𝓻𝓸𝓭𝓾𝓬𝓽 𝓲𝓼 𝓬𝓻𝓪𝓯𝓽𝓮𝓭 𝓮𝓷𝓽𝓲𝓻𝓮𝓵𝔂 𝓯𝓻𝓸𝓶 𝓷𝓪𝓽𝓾𝓻𝓪𝓵 𝓶𝓪𝓽𝓮𝓻𝓲𝓪𝓵𝓼, 𝓭𝓮𝓼𝓲𝓰𝓷𝓮𝓭 𝓽𝓸 𝓫𝓮 𝓫𝓸𝓽𝓱 𝓾𝓼𝓮𝓻-𝓯𝓻𝓲𝓮𝓷𝓭𝓵𝔂 𝓪𝓷𝓭 𝓱𝓲𝓰𝓱𝓵𝔂 𝓮𝓯𝓯𝓮𝓬𝓽𝓲𝓿𝓮... 𝓮𝓷𝓼𝓾𝓻𝓲𝓷𝓰 𝓪 𝓬𝓸𝓶𝓯𝓸𝓻𝓽𝓪𝓫𝓵𝓮 𝓪𝓷𝓭 𝓮𝓷𝓳𝓸𝔂𝓪𝓫𝓵𝓮 𝓸𝓾𝓽𝓭𝓸𝓸𝓻 𝓮𝔁𝓹𝓮𝓻𝓲𝓮𝓷𝓬𝓮.";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < subtitle.length) {
        setSubTitleText((prev) => prev + subtitle[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <Fragment>
      <section className="introduce-section relative">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="./image/rain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="about-shop relative z-10 p-6 rounded-lg shadow-lg bg-white bg-opacity-80">
          <h3 className="header-about-shop text-center text-3xl font-bold">
            𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐎𝐔𝐑 𝐒𝐓𝐎𝐑𝐄
          </h3>
          <div className="sub-title-about-shop text-center mt-4 mb-4">
            {subTitleText}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default IntroduceAboutShop;
