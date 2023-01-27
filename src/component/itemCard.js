import React, { useContext, useEffect } from "react";
import { Context } from "../contex/AppContext";

const ItemCard = (data) => {
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
      <div
        onClick={() => {
          addToStore(data.data);
        }}
        className="itemCard"
      >
        <img
          className="itemCardImg"
          src={data.data.pictureUrl}
          alt={data.data.name}
        />
        <h4 className="itemCardName">{data.data.name}</h4>
      </div>
    </>
  );
};

export default ItemCard;
