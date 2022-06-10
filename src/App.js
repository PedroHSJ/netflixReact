import "./App.css";
import FilmsListSeries from "./components/filmsListSeries";
import FilmsListMovies from "./components/filmsListMovies";
import FilmHome from "./components/filmHome";
import React, { useState, useEffect, useContext } from "react";
import './Views/Login/Login.css'
import {firebase, auth} from "./service/firebase"
import { AuthContext } from './context/AuthContext'
import { ProgressSpinner } from "primereact/progressspinner";
import "primeicons/primeicons.css";


const API = "https://api.themoviedb.org/3";
const API_KEY = "fa8367b24166839e18a329a3a990a6a3";

function App() {
    const [text, setText] = useState("");
    const {user, setUser} = useContext(AuthContext)
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(true)
    console.log()

    useEffect(() => {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
        setLoading(false)
            if(user) {
                const {uid, displayName, photoURL} = user

               
                if(!displayName || !photoURL) throw new Error("O usuário não possui foto!")

                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                })
                if(user != undefined){
                    setValid(!valid)
                }
                   
                
            }
        })
    }, [])

    const onClickLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if(result.user){
            const {uid, displayName, photoURL} = result.user

            if(!displayName || !photoURL) throw new Error("O usuário não possui foto!")

                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                })
            
        }
    }

    
    return (
        <>
        {loading ?  
        <div style={{height: "100vh", backgroundColor: "#222", display: "flex", justifyContent: "center", alignItems: "center"}}>
               <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
                    <div className="container-fluid">
                        <div className="container">
                            <a className="navbar-brand" href="#">
                                <img
                                    src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    
                    </div>
            </nav>
            <ProgressSpinner />
        </div>
          : 
          valid ?  
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
            {/* <FilmsListSeries
                title="Feitos para você"
                url={`${API}/trending/pearson/day?language=pt-BR&api_key=${API_KEY}`}
            /> */}
            <FilmsListSeries
                title="Series populares"
                url={`${API}/tv/popular?api_key=${API_KEY}&language=pt-BR`}
            />
            
            <FilmsListSeries
                title="Em alta do dia"
                url={`${API}/trending/tv/day?language=pt-BR&api_key=${API_KEY}`}
            />
          </div> 
          : 
          <div className='login'>
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
                    <div className="container-fluid">
                        <div className="container">
                            <a className="navbar-brand" href="#">
                                <img
                                    src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    
                    </div>
            </nav>
            <div className="main-login">
                <div className='login-info'>
                    <h1 style={{color: "#fff"}}>Faça login com sua conta do google</h1>
                <button type="button" className="btn btn-primary" onClick={onClickLogin}>Login com <i className="pi pi-google"></i></button>
            
                </div>
            </div>
          </div>
          

         
        }
          
    
        </>
       
    );
}

export default App;

// {valid ?  <div className="App">
// <FilmHome />

// <FilmsListSeries
//     title="Series em alta"
//     url={`${API}/trending/tv/week?language=pt-BR&api_key=${API_KEY}`}
// />
// <FilmsListMovies
//     title="Filmes em alta"
//     url={`${API}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`}
// />
// <FilmsListSeries
//     title="Últimos lançamentos"
//     url={`${API}/tv/on_the_air?api_key=${API_KEY}&language=pt-BR&`}
// />
// {/* <FilmsListSeries
//     title="Feitos para você"
//     url={`${API}/trending/pearson/day?language=pt-BR&api_key=${API_KEY}`}
// /> */}
// <FilmsListSeries
//     title="Series populares"
//     url={`${API}/tv/popular?api_key=${API_KEY}&language=pt-BR`}
// />

// <FilmsListSeries
//     title="Em alta do dia"
//     url={`${API}/trending/tv/day?language=pt-BR&api_key=${API_KEY}`}
// />
// </div> : 
// <div className='login'>
// <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
//         <div className="container-fluid">
//             <div className="container">
//                 <a className="navbar-brand" href="#">
//                     <img
//                         src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
//                         alt=""
//                     />
//                 </a>
//             </div>
        
//         </div>
// </nav>
// <div className="main-login">
//     <div className='login-info'>
//     <button type="button" className="btn btn-primary" onClick={onClickLogin}>Login</button>

//     </div>
// </div>
// </div>}


{/* <div className='login'>
<nav className="navbar navbar-expand-sm navbar-dark fixed-top">
        <div className="container-fluid">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img
                        src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                        alt=""
                    />
                </a>
            </div>
        
        </div>
</nav>
<div className="main-login">
    <div className='login-info'>
    <button type="button" className="btn btn-primary" onClick={onClickLogin}>Login</button>

    </div>
</div>
</div>  */}
