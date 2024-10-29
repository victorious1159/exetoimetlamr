import React, { Fragment } from "react";
import Layout from "../layout";
import Details from "./Details";


const DetailsComponent = () => {
  return (
    <Fragment>
      <Details />
    </Fragment>
  );
};

const ComboDetails = (props) => {
  return (
    <Fragment>
        <Layout children={<DetailsComponent />} />
    </Fragment>
  );
};

export default ComboDetails;
