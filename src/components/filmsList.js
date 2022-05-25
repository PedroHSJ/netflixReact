import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./filmsList.css";
import { Carousel } from "primereact/carousel";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const API = "https://api.themoviedb.org/3/";
const API_KEY = "fa8367b24166839e18a329a3a990a6a3";

export default (props) => {
    const moviesPopular = `movie/popular?api_key=${API_KEY}&language=pt-BR&page=${props.page}`;

    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get(`${API}${moviesPopular}`).then((resp) => {
            return setInfo(resp.data.results);
        });
    }, [props.page]);

    const productTemplate = (info) => {
        return (
            <div className="filmList" style={{backgroundColor:"#111"}}> 
                <img
                    src={`https://image.tmdb.org/t/p/w300${info.poster_path}`}
                    onError={(e) =>
                        (e.target.src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                    }
                    className="product-image"
                    style={{ width: "180px" }}
                />
            </div>
        );
    };

    return (
        // <div className="main">

        //     <ul className="filmList">

        //         <div>
        //             <FontAwesomeIcon icon={faChevronLeft} size='6x' style={{position: 'absolute', marginTop: '105px', zIndex: '2'}}/>
        //         </div>

        //         <div>
        //             <FontAwesomeIcon icon={faChevronRight} size='6x' style={{position: 'absolute', marginTop: '10%', zIndex: '2'}}/>
        //         </div>

        //         {info.map(film => {
        //             const IMAGE = `https://image.tmdb.org/t/p/w300${film.poster_path}`
        //             return (
        //             <li className="film" key={film.id}><img src={IMAGE}/></li>

        //             )
        //         })}

        //     </ul>

        // </div>
        <div className="main">
            <div className="carousel-demo">
                    <Carousel
                        value={info}
                        numVisible={6}
                        numScroll={2}
                        itemTemplate={productTemplate}
                        orientation="horizontal"
                        style={{backgroundColor:"#111"}}
                        circular={true}
                        header={props.title}
                    />
            </div>
        </div>
    );
};
