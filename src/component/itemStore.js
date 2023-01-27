import React, { useContext, useEffect } from "react";
import { Context } from "../contex/AppContext";

const ItemStore = (data) => {
  const { handleFunctions, state } = useContext(Context);
  let {
    getDataItem,
    getUserId,
    addToStore,
    quantityMinus,
    quantityPlus,
    dropWhenQuantityZero,
    writeData,
  } = handleFunctions;

  // const route = useRoutes();
  //   console.log(data);
  return (
    <>
      <div className="itemStore">
        <img
          className="itemStoreImg"
          src={data.data.pictureUrl}
          alt={data.data.name}
        />
        <div className="middleContainer">
          <h4 className="itemStoreName">{data.data.name}</h4>
          <div className="buttonContainer">
            <div onClick={() => quantityMinus(data.data)}>-</div>
            <p>{data.data.qty}</p>
            <div onClick={() => quantityPlus(data.data)}>+ </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemStore;
