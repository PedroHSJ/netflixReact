import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import Logo from "../../img/logo.png";
import "../View.css";

const API = "https://api.themoviedb.org/3";
const API_KEY = "fa8367b24166839e18a329a3a990a6a3";

export default () => {
    const { id } = useParams();
    const [info, setInfo] = useState([]);
    console.log(info)

    useEffect(() => {
        axios
            .get(`${API}/tv/${id}?api_key=${API_KEY}&language=pt-BR`)
            .then((resp) => {
                setInfo(resp.data);
            });
    }, []);
    console.log(info)
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark">
                <div>
                    <Link to={"/"}>
                        <img src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png" alt="Logo Netflix" />
                    </Link>
                </div>
            </nav>
            {(info.length && info.backdrop_path !== null) ||
            info.backdrop_path !== undefined ? (
                <div
                    className="filmHome"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.backdrop_path})`,
                    }}
                >
                    <div className="info">
                        <div className="info-poster">
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${info.poster_path}`}
                            />
                        </div>
                        <div className="info-text">
                            <h2 className="info-text-h2">{info.name}</h2>
                            {info.last_air_date && (
                                <span className="info-text-year">
                                    Útilmo episódio lançado:{" "}
                                    {info.last_air_date.split("-")[2]}/
                                    {info.last_air_date.split("-")[1]}/
                                    {info.last_air_date.split("-")[0]}
                                </span>
                            )}
                            <h3 className="info-text-h3">Sinopse</h3>
                            <h5 className="info-text-h5">{info.overview}</h5>
                            <h3 className="info-text-h3">
                                Produzido por
                            </h3>
                            <div className="info-companies">
                                {info.production_companies.map(
                                    (companie) => {
                                        return (
                                            <>
                                                {companie.logo_path ? (
                                                    <div className="info-companies-son">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w300${companie.logo_path}`}
                                                        />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading">
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
};

// <div className="erro">
//                     <h1>Busca não encontrada!</h1>
//                     <h1>Tente novamente!</h1>
//                 </div>
