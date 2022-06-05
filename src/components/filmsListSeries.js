import React, { useEffect, useState } from "react";
import axios from "axios";
import "./filmsList.css";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const API = "https://api.themoviedb.org/3";
const API_KEY = "fa8367b24166839e18a329a3a990a6a3";

export default (props) => {
    const [info, setInfo] = useState([]);
    const [infoExist, setInfoExist] = useState(false)

    useEffect(() => {
        axios.get(`${props.url}`).then((resp) => {
            if(resp.data.results.length > 0){
                setInfoExist(false)
                setInfo(resp.data.results);
                setInfoExist(true)


            }
            
        });
    }, []);
    const productTemplate = (info) => {
        return (
            <div
                className="filmList"
                style={{ backgroundColor: "#111" }}
            >
                    <Link to={`/series/${info.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w300${info.poster_path}`}
                            onError={(e) =>
                                (e.target.src =
                                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                            }
                            className="product-image"
                            style={{ width: "180px" }}
                        />
                    </Link>
               
            </div>
        );
    };

    return (
        <div className="main">
            
            <h2>{props.title}</h2>
            <div className="carousel-demo">
                <Carousel
                    value={info}
                    numVisible={6}
                    numScroll={2}
                    itemTemplate={productTemplate}
                    orientation="horizontal"
                    style={{ backgroundColor: "#111" }}
                    circular={true}
                />
            </div>
        </div>
    );
};

{
    /* <Route
path="/pokemons/:name"
element={<View />}
/> */
}
