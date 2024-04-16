import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";

import FbiWanted from "./FbiWanted";
import FbiWantedTitle from "./FbiWantedTitle";
import FbiWantedPage from "./FbiWantedPage";
import FbiWantedPageClick from "./FbiWantedPageClick";
import Records from "./Records";
import WantedPage from "./WantedPage";

export default function Navigation() {
  return (
    <HashRouter basename="/">
      <div className="fbiMain">


        <p className="linker">
          <Link to='/' className="home">
          FBI Wanted
          </Link>
        </p>







      </div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/offices" element={<FbiWanted />} />
        <Route path="/title" element={<FbiWantedTitle />} />
        <Route path="/page" element={<FbiWantedPage />} />
        <Route path="/fbiPage:pageNumber" element={<FbiWantedPageClick />} />
        <Route path="/records" element={<Records />} />
        <Route path="/wanted" element={<WantedPage />} />
        
       
  

      </Routes>
   

    </HashRouter>
  )
}
