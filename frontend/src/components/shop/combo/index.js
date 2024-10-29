import React, { Fragment, createContext } from "react";
import Layout from "../layout";
import SingleCombo from "./SingleCombo";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <div className="">
      <section className="p-20 m-4 md:mx-8  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleCombo />
      </section>
      </div>
 
    </Fragment>
  );
};

const Combo = (props) => {
  
  return (
    <Fragment>
        <Layout children={<HomeComponent />} />
    </Fragment>
  );
};

export default Combo;
