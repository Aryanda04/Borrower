import React, { useContext, useEffect, useState } from "react";
import { Context } from "../contex/AppContext";
import { useNavigate, useRoutes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "./SignIn";

const Admin = () => {
  // const route = useRoutes();
  const navigate = useNavigate();
  const { handleFunctions, state } = useContext(Context);
  let {
    userId,
    setUserId,
    dataBorrowed,
    fetchStatus,
    setFetchStatus,
    user,
    setUser,
  } = state;
  let {
    getDataItem,
    getUserId,
    getUserData,
    getDataBorrowed,
    addToStore,
    deleteDataStore,
  } = handleFunctions;
  // console.log(fetchStatus);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        setUser(user);
        if (fetchStatus) {
          getDataBorrowed();
          setFetchStatus(false);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [fetchStatus, setFetchStatus]);
  const keys = Object.keys(dataBorrowed);

  console.log(dataBorrowed);
  //   console.log(keys);
  return (
    <>
      <div className="App">
        {user ? (
          <>
            <h2>Tabel Peminjaman</h2>
            <table id="table">
              <tr>
                <th>No</th>
                <th>UID</th>
                <th>Name</th>
                <th>NIM</th>
                <th>Date</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>

              {keys.map((key) => {
                const data = dataBorrowed[key];
                const keys2 = Object.keys(data.item);
                //   console.log("keys2", keys2);
                //   console.log("data", data.item);
                return (
                  <>
                    {/* <td>{index}</td>
                  <td>{key}</td> */}
                    {keys2.map((key2) => {
                      const data2 = data.item[key2];
                      // console.log("data2", data2.name);

                      return (
                        <tr>
                          <td>-</td>
                          <td>{key}</td>
                          <td>{data2.personName}</td>
                          <td>{data2.personNIM}</td>
                          <td>{data2.borrowDate}</td>
                          <td>{data2.name}</td>
                          <td>{data2.qty}</td>
                          <td>
                            <button
                              onClick={() => {
                                deleteDataStore(`data/${key}/item/${key2}`);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
                // console.log("dataUser", dataItem[key]);
              })}
            </table>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
};

export default Admin;
