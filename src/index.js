import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Views/Login/Login"
import ViewSeries from "./Views/ViewSerie/ViewSeries";
import ViewsMovies from "./Views/ViewMovie/ViewsMovies";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext"

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<App />} />
                    <Route path="/series/:id" element={<ViewSeries />} />
                    <Route path="/films/:id" element={<ViewsMovies />} />

                </Routes>
            </Router>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
