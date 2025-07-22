import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";
import FbiWantedTitle from "./FbiWantedTitle";
import FbiWantedPage from "./FbiWantedPage";
import Footers from "./Footers";
import ArtCrimesPage from "./ArtCrimesPage";
import ArtCrimesMaterial from "./ArtCrimesMaterial";
import ArtCrimesCategory from "./ArtCrimesCategory";
import OneForAll from "./OneForAll";
import SearchOffices from "./SearchOffices";

export default function Navigation() {
  return (
    <HashRouter basename="/">

      <div className="navContainer">
        <div className="fixed">
          <div style={{ display: "flex" }}>
            <Link to='/' className="butt"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
              FBI
            </Link>
            <Link to='wanted' className="butt"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
              Wanted
            </Link>
            <Link to='art' className="butt"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
              Art theft
            </Link>
          </div>
          <div className="search">
            <SearchOffices placeholder={'Search '} linkTo={'/offices'} />
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wanted" element={<FbiWantedPage />} />
        <Route path="/art" element={<ArtCrimesPage />} />
        <Route path="/title" element={<FbiWantedTitle />} />
        <Route path="/offices" element={<OneForAll />} />
        <Route path="/material" element={<ArtCrimesMaterial />} />
        <Route path="/categ" element={<ArtCrimesCategory />} />
      </Routes>
      <Footers />
    </HashRouter>
  )
}
