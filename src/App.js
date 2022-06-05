import "./App.css";
import FilmsListSeries from "./components/filmsListSeries";
import FilmsListMovies from "./components/filmsListMovies";
import FilmHome from "./components/filmHome";
import React, { useState, useEffect } from "react";

const API = "https://api.themoviedb.org/3";
const API_KEY = "fa8367b24166839e18a329a3a990a6a3";

function App() {
    const [text, setText] = useState("");

    return (
        <div className="App">
            <FilmHome />

            <FilmsListSeries
                title="Series em alta"
                url={`${API}/trending/tv/week?language=pt-BR&api_key=${API_KEY}`}
            />
            <FilmsListMovies
                title="Filmes em alta"
                url={`${API}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`}
            />
            <FilmsListSeries
                title="Últimos lançamentos"
                url={`${API}/tv/on_the_air?api_key=${API_KEY}&language=pt-BR&`}
            />
            <FilmsListSeries
                title="Feitos para você"
                url={`${API}/trending/pearson/day?language=pt-BR&api_key=${API_KEY}`}
            />
            <FilmsListSeries
                title="Series populares"
                url={`${API}/tv/popular?api_key=${API_KEY}&language=pt-BR`}
            />

            <FilmsListSeries
                title="Em alta do dia"
                url={`${API}/trending/tv/day?language=pt-BR&api_key=${API_KEY}`}
            />
        </div>
    );
}

export default App;
