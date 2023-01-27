import React, { useContext, useEffect } from "react";
import { Context } from "../contex/AppContext";

const Home = () => {
  const { handleFunctions, state } = useContext(Context);
  let { getUserId, getDateNow } = handleFunctions;
  useEffect(() => {}, []);

  return (
    <>
      <div className="App">
        <div className="flexContainerColumn">
          <div className="headContainer">
            <p>
              Selamat datang di Projek Mikrokontroller dan IoT <br></br> Ilmu
              Komputer Universitas Pertamina
            </p>
            <h3>Borrower</h3>
            <p>Aplikasi Peminjaman Barang menggunakan IoT</p>
          </div>
          <div className="footerContainer">
            {/* <p>Click Here!!!</p> */}
            <button
              className="submitButton"
              onClick={() => {
                getDateNow();
                getUserId();
              }}
            >
              next
            </button>
          </div>
          <div className="title">
            <h4>Langkah-langkah menggunakan aplikasi Borrower:</h4>
          </div>
          <div className="bodyContainer">
            <ol>
              <li>
                <p class="event-date">1.</p>
                <p class="event-description">
                  Pada halaman beranda (landing page), tempelkan kartu anda pada
                  perangkat scan KTM yang disediakan.
                </p>
              </li>
              <li>
                <p class="event-date">2.</p>
                <p class="event-description">
                  Disaat perangkat memberikan sinyal berupa suara, maka tekan
                  tombol "next", lalu anda akan dialihkan pada halaman daftar
                  peminjaman barang.
                </p>
              </li>
              <li>
                <p class="event-date">3.</p>
                <p class="event-description">
                  Pada halaman peminjaman barang, terdapat daftar barang yang
                  dapat dipinjam pada bagian kiri. tekan barang yang ingin anda
                  pinjam.
                </p>
              </li>
              <li>
                <p class="event-date">4.</p>
                <p class="event-description">
                  Barang yang anda ingin pinjam akan muncul di bagian kanan,
                  pilih jumlah masing-masing barang yang ingin dipinjam.
                </p>
              </li>
              <li>
                <p class="event-date">5.</p>
                <p class="event-description">
                  Setelah anda tentukan barang serta jumlah barang yang ingin
                  anda pinjam, tekan tombol submit.
                </p>
              </li>
              <li>
                <p class="event-date">6.</p>
                <p class="event-description">
                  Anda akan diarahkan ke halaman awal.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
