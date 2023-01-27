import { child, get, ref, set, remove } from "firebase/database";
// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import swal from "sweetalert";

const Context = React.createContext();

function ContextProvider({ children }) {
  // const route = useRouter();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [dateNow, setDateNow] = useState("");
  const [dataItem, setDataItem] = useState([]);
  const [dataStore, setStore] = useState([]);
  const [dataUser, setUserData] = useState([]);
  const [dataBorrowed, setDataBorrowed] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const getDataItem = () => {
    const dbRef = ref(db);
    get(child(dbRef, `storage/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let result = data["item"];

          // console.log(data);
          setDataItem(result);

          // console.log(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDataBorrowed = () => {
    const dbRef = ref(db);
    // console.log(db);
    get(child(dbRef, `data/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDataBorrowed(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteDataStore = (node) => {
    const dbRef = ref(db);
    console.log(node);
    remove(child(dbRef, `${node}`))
      .then(() => {
        swal("Data Deleted");
      })
      .catch((error) => {
        console.log("Error deleting data: ", error);
      });
    setFetchStatus(true);
  };
  const getUserId = () => {
    const dbRef = ref(db);

    get(child(dbRef, `userNow/uid`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userID = snapshot.val();
          // let result = data["item"];
          navigate("/catalog");
          // console.log(userID);
          setUserId(userID);
          // console.log(result);
        } else {
          swal("silahkan tap");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDateNow = () => {
    const dbRef = ref(db);

    get(child(dbRef, `userNow/date`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const date = snapshot.val();
          // let result = data["item"];
          // navigate("/catalog");
          // console.log(userID);
          setDateNow(date);
          // console.log(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteUserId = () => {
    set(ref(db, `userNow/`), {
      uid: "",
    });
  };
  const getUserData = () => {
    const dbRef = ref(db);

    get(child(dbRef, `userList/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          // console.log(userID);
          setUserData(userData);
          // console.log(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addToStore = (data) => {
    let newCart = [...dataStore];
    // console.log("newCart", newCart);
    let itemInCart = newCart.find((item) => data.name === item.name);
    // console.log("itemInCart", itemInCart);
    if (itemInCart) {
      itemInCart.qty++;
    } else {
      itemInCart = {
        ...data,
        qty: 1,
      };
      newCart.push(itemInCart);
    }
    setStore(newCart);
  };
  const writeData = (e) => {
    // const keys = Object.keys(dataItem);
    console.log(dateNow);
    e.preventDefault();
    dataStore.map((item) => {
      console.log("isi data store", item.idItem);
      set(ref(db, `data/${userId}/item/${item.idItem}`), {
        idItem: item.idItem,
        name: item.name,
        personName: dataUser.nama,
        personNIM: dataUser.nim,
        qty: item.qty,
        borrowDate: dateNow,
        pictureUrl: item.pictureUrl,
      });
      // keys.map((key) => {
      //   const data = dataItem[key];
      //   if (data.idItem === item.idItem) {
      //     set(ref(db, `storage/item/${item.idItem}`), {
      //       idItem: item.idItem,
      //       qty: item.qty,
      //       name: item.name,
      //       pictureUrl: item.pictureUrl,
      //     });
      //   }
      // });
    });
    deleteUserId();
    setStore([]);
    swal({
      title: "Success!",
      text: "Please Take Care With Our Items!",
      icon: "success",
      button: "Next",
    });
    navigate("/");
  };
  const quantityPlus = (data) => {
    const newCart = [...dataStore];
    newCart.find((item) => item.name === data.name).qty += 1;
    setStore(newCart);
  };
  const quantityMinus = (data) => {
    const newCart = [...dataStore];
    let itemInCart = newCart.find((item) => item.name === data.name);
    itemInCart.qty -= 1;
    setStore(newCart);
    dropWhenQuantityZero(data);
  };
  const dropWhenQuantityZero = (data) => {
    let newCart = [...dataStore];
    let itemInCart = newCart.find((item) => data.name === item.name);
    if (itemInCart.qty === 0) {
      setStore(dataStore.filter((product2) => product2 !== itemInCart));
    }
  };
  const handleRoutes = () => {
    navigate("/catalog");
  };

  let handleFunctions = {
    getDataItem,
    getDataBorrowed,
    getUserId,
    getDateNow,
    getUserData,
    addToStore,
    quantityMinus,
    quantityPlus,
    dropWhenQuantityZero,
    writeData,
    handleRoutes,
    deleteDataStore,
  };

  let state = {
    userId,
    dataUser,
    dataItem,
    dataStore,
    dataBorrowed,
    fetchStatus,
    user,
    setFetchStatus,
    setUserId,
    setDataItem,
    setDataBorrowed,
    setStore,
    setUser,
  };

  return (
    <Context.Provider value={{ handleFunctions, state }}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
