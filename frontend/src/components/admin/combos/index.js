import React, { Fragment } from "react";
import AdminLayout from "../layout";
import ComboMenu from "./CombosMenu";
import AllCombo from "./AllCombo";

const CombosComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <ComboMenu />
      <AllCombo />
    </div>
  );
};

const Combos = (props) => {
  //   const [data, dispatch] = useReducer(categoryReducer, categoryState);
  return (
    <Fragment>
      {/* <CategoryContext.Provider value={{ data, dispatch }}> */}
      <AdminLayout children={<CombosComponent />} />
      {/* </CategoryContext.Provider> */}
    </Fragment>
  );
};

export default Combos;
