import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";
import { deleteCombo, getAllCombos } from "./FecthApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllCombo = (props) => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCombos();
      console.log(responseData); // Log the response

      if (responseData && responseData.combos) {
        setCombos(responseData.combos);
      } else {
        setCombos([]); // Set to empty array if undefined
      }
    } catch (error) {
      console.error("Error fetching combos:", error);
    }
  };

  const handleDeleteCombo = async (comboId) => {
    try{
      await deleteCombo(comboId);
      alert("Combo deleted successfully");
      fetchData()
    } catch(err) {
      console.error("Error deleting combo:", err);
    }
  }  

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Combo Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {combos && combos.length > 0 ? (
              combos.map((item, key) => <ComboTable combo={item} key={key} deleteCombo={handleDeleteCombo}/>)
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-xl text-center font-semibold py-8"
                >
                  No combo found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {combos && combos.length} combo(s) found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Combo Component */
const ComboTable = ({ combo, deleteCombo }) => {
  const history = useHistory();

  

  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">{combo.comboName}</td>
        <td className="p-2 text-left">${combo.comboPrice}</td>
        <td className="p-2 text-center">
          {combo.comboStatus === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {combo.comboStatus}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {combo.comboStatus}
            </span>
          )}
        </td>
        <td className="p-2 text-center">
          {moment(combo.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(combo.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={() => {history.push(`/admin/dashboard/editcombo/${combo._id}`);}
            }
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={() => deleteCombo(combo._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 10.586L5.293 5.879 4.879 6.293 9.586 11 4.879 15.707l.414.414L10 11.414l5.707 5.707.414-.414L10 10.586z" />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCombo;
