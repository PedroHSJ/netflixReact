import React, { useEffect, useState } from "react";
import "./filmHome.css";
import axios from "axios";
import Logo from "../img/logo.png";
import useDebounce from "../useDebounce";

const API = "https://api.themoviedb.org/3";
const API_KEY = "fa8367b24166839e18a329a3a990a6a3";

export default () => {
  const [info, setInfo] = useState([]);
  const [displayValue, setDisplayValue] = useState("");
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (displayValue !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${displayValue}&language=pt-BR`
        )
        .then((resp) => {
          const films = resp.data.results.filter((film) => {
            if (film.backdrop_path !== null && film.overview !== "") {
              return film;
            }
          });
          setInfo(films);
        });
    } else {
      axios
        .get(`${API}/tv/popular?api_key=${API_KEY}&language=pt-BR`)
        .then((resp) => {
          const films = resp.data.results.filter((film) => {
            if (film.backdrop_path !== null && film.overview !== "") {
              return film;
            }
          });
          setInfo(films);
        });
    }
  }, [displayValue]);

  const searchBar = (e) => {
    setDisplayValue(e.target.value)
  };

  const rightClick = () => {
    if (count < info.length - 1) {
      setCount(count + 1);
    } else if (count == info.length - 1) {
      setCount(0);
    }
  };

  const leftClick = () => {
    if (count == 0) {
      setCount(info.length - 1);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
        <div className="container-fluid">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={Logo} alt="" />
            </a>
          </div>

          <input
            className="form-control"
            type="search"
            placeholder="Busque aqui"
            value={displayValue}
            onChange={searchBar}
          />
        </div>
      </nav>

      {(info.length && info.backdrop_path !== null) ||
      info.backdrop_path !== undefined ? (
        <div
          className="filmHome"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${info[count].backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <div className="filtro-vertical">
            <div className="filtro-horizontal">
              <div className="left">
                <span style={{ color: "white" }} onClick={leftClick}>
                  &#10096;
                </span>
              </div>
              <div className="right">
                <span style={{ color: "white" }} onClick={rightClick}>
                  &#10097;
                </span>
              </div>
              <div className="info">
                <div className="name">
                  <h1>{info[count].original_name}</h1>
                </div>
                <div className="info-descript">
                  <h2>{info[count].overview}</h2>
                </div>
                <div className="info-buttons">
                  <button className="btn btn-light">
                    <span>Assistir</span>
                  </button>
                  <button className="btn btn-dark">
                    <span>+ Minha Lista</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="erro">
          <h1>Busca não encontrada!</h1>
          <h1>Tente novamente!</h1>
        </div>
      )}
    </div>
  );
};

//style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${info.backdrop_path})`
