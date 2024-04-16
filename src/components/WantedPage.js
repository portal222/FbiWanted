import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FbiDetails from "./FbiDetails";
import SearchPlace from "./SearchPlace";
import GlobalContext from "./GlobalContext";
import BackToTop from "./BackToTop";
import Pagination from "./Pagination";
import Records from "./Records";




const WantedPage = () => {

    const [wanted, setWanted] = useState([]);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState([]);
    const [currentPage, setCurrentPage] = useState(7);


    // const globalCtx = useContext(GlobalContext);
    // const searchStringValue = globalCtx.searchStringValue;


    // useEffect(() => {
    //     getWanted(searchStringValue);
    // }, [searchStringValue]);

    useEffect(() => {
        getWanted();
    }, []);
    // useEffect(() => {
    //     getWanted();
    // }, []);

    // console.log("trazeni FBi broj", searchStringValue);

    const getWanted = async () => {

        const urlFbi = `https://api.fbi.gov/wanted/v1/list?page=${currentPage}`;
    
      
      

        try {
            const responseFbi = await axios.get(urlFbi);

            const dataFbi = responseFbi.data.items;
            const samoProba = responseFbi.data
            console.log("novi api FBI baza", dataFbi);

            setWanted(dataFbi);
            setImages(dataFbi.images)
            setResults(dataFbi.length);
            setTotal(samoProba);


            console.log("FBI pocetak", samoProba);

        } catch (err) {
            setError(err);
        }
    }

    const nPages = (50);

    if (results == 0) {
        return (
            <div className="fbiMain">
                <SearchPlace />
                <p>Nothing found</p>
            </div>
        )
    }
    
    return (
        <>
            <div>
                <div className="fbiMain">
                  
                    Results: {total.total}
                </div>
        <SearchPlace />
                
   
            <Records wanted={wanted} />
            <Pagination
             nPages={nPages}
             currentPage={currentPage}
             setCurrentPage={setCurrentPage} />
            <BackToTop /> 
            </div>
        </>
    )
}
export default WantedPage;