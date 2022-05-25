import './App.css';
import FilmsList from './components/filmsList';
import FilmHome from './components/filmHome';
import React, {useState, useEffect} from 'react';


function App() {
  
  const [text, setText] = useState('')
 
  
  
  return (
    <div className="App">
      
        <FilmHome 
        />
        <FilmsList 
        page='1' title="Em Alta"/>
        <FilmsList 
        page='2'/>
        <FilmsList 
        page='3'/>
        <FilmsList 
        page='4'/>

        
      
    </div>
  );
}

export default App;
