import "./App.css";
import { db } from "./firebase";
import { child, get, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import "firebase/database";
import { Context } from "./contex/AppContext";
import { useNavigate, useRoutes } from "react-router-dom";
import ItemCard from "./component/itemCard";
import ItemStore from "./component/itemStore";
import swal from "sweetalert";

function App() {
  const navigate = useNavigate();
  const { handleFunctions, state } = useContext(Context);
  let {
    getDataItem,
    getUserId,
    getUserData,
    addToStore,
    quantityMinus,
    quantityPlus,
    dropWhenQuantityZero,
    writeData,
  } = handleFunctions;

  let {
    userId,
    dataUser,
    dataItem,
    dataStore,
    setUserId,
    setDataItem,
    setStore,
  } = state;

  useEffect(() => {
    getDataItem();
    getUserData();
    console.log(userId);
    if (!Boolean(userId)) {
      navigate("/");
      swal({
        title: "Access Denied!",
        text: "Please Scan Your Card!",
        icon: "error",
        button: "Back",
      });
    }
  }, []);
  const keys = Object.keys(dataItem);
  const keys2 = Object.keys(dataStore);

  return (
    <div className="App">
      <div class="split left">
        <div className="gridContainer">
          {keys.map((key) => {
            const data = dataItem[key];
            // console.log("dataUser", dataItem[key]);
            return <ItemCard data={data} />;
          })}
        </div>
      </div>

      <div class="split right">
        <h3 className="headTitle">Item Borrowed</h3>
        <div className="flexContainerColumn" styles={"width=80%"}>
          {keys2.map((key) => {
            const data = dataStore[key];
            return <ItemStore data={data} />;
          })}
        </div>
        <div className="bottom">
          <button className="submitButton" onClick={writeData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
