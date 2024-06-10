import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";

import FbiWanted from "./FbiWanted";
import FbiWantedTitle from "./FbiWantedTitle";
import FbiWantedPage from "./FbiWantedPage";
import Footers from "./Footers";
import FreeGames from "./FreeGames";


export default function Navigation() {
  return (
    <HashRouter basename="/">
      <div className="fbiMain">


        <p className="linker">
          <Link to='/' className="home">
          FBI Wanted
          </Link>
        </p>
        <p className="linker">
          <Link to='/games' className="home">
         Free Games
          </Link>
        </p>







      </div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/offices" element={<FbiWanted />} />
        <Route path="/title" element={<FbiWantedTitle />} />
        <Route path="/page" element={<FbiWantedPage />} />
        <Route path="/games" element={<FreeGames />} />
    
      
        
       
  

      </Routes>

      <Footers />
   

    </HashRouter>
  )
}
