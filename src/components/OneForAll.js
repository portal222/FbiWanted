import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GlobalContext from "./GlobalContext";
import Loader from "./Loader";
import FbiWantedTitle from "./FbiWantedTitle";
import FbiWanted from "./FbiWanted";
import ArtCrimesCategory from "./ArtCrimesCategory";
import ArtCrimesMaterial from "./ArtCrimesMaterial";


const OneForAll = () => {

    const [wanted, setWanted] = useState([]);
    const [offices, setOffices] = useState([]);
    const [artCat, setArtCat] = useState([]);
    const [artMat, setArtMat] = useState([]);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [resultsOff, setResultsOff] = useState([]);
    const [resultsCat, setResultsCat] = useState([]);
    const [resultsMat, setResultsMat] = useState([]);
    const [total, setTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getWanted(searchStringValue);
    }, [searchStringValue]);

    const getWanted = async () => {

        const urlFbi = `https://api.fbi.gov/wanted/v1/list?title=${searchStringValue}`;
        const urlOff = `https://api.fbi.gov/wanted/v1/list?field_offices=${searchStringValue}`;
        const urlCat = `https://api.fbi.gov/artcrimes/list?crimeCategory=${searchStringValue}`;
        const urlMat = `https://api.fbi.gov/artcrimes/list?materials=${searchStringValue}`;

        try {
            const responseFbi = await axios.get(urlFbi);
            const responseOff = await axios.get(urlOff);
            const responseCat = await axios.get(urlCat);
            const responseMat = await axios.get(urlMat);

            const dataFbi = responseFbi.data.items;
            const dataOff = responseOff.data.items;
            const dataCat = responseCat.data.items;
            const dataMat = responseMat.data.items;

            const forTotal = responseFbi.data.total;

            setWanted(dataFbi);
            setOffices(dataOff);
            setArtCat(dataCat);
            setArtMat(dataMat);
            setImages(dataFbi.images)
            setResults(dataFbi.length);
            setResultsOff(dataOff.length);
            setResultsCat(dataCat.length);
            setResultsMat(dataMat.length);
            setTotal(forTotal);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    if (isLoading) {
        return <Loader />
    } else if (results == 0 && resultsOff == 0 && resultsCat == 0 && resultsMat == 0) {
        return (
            <div className="fbiMain">
                <div className="paddings"></div>
                <p className="results">{searchStringValue} not found</p>
                <div className="paddings"></div>
                <div style={{ marginTop: "800px" }}></div>
            </div>
        )
    } else if (resultsOff == 0 && resultsCat == 0 && resultsMat == 0) {
        return (
            <div className="fbiMain">
                <FbiWantedTitle wanted={searchStringValue} />
            </div>
        )
    } else if (results == 0 && resultsCat == 0 && resultsMat == 0) {
        return (
            <div className="fbiMain">
                <FbiWanted wanted={searchStringValue} />
            </div>
        )
    } else if (resultsCat != 0 && resultsMat != 0) {
        return (
            <div className="fbiMain">
                <ArtCrimesCategory wanted={searchStringValue} />
                <ArtCrimesMaterial wanted={searchStringValue} />
            </div>
        )
    } else if (results == 0 && resultsOff == 0 && resultsMat == 0) {
        return (
            <div className="fbiMain">
                <ArtCrimesCategory wanted={searchStringValue} />
            </div>
        )
    } else if (results == 0 && resultsOff == 0 && resultsCat == 0) {
        return (
            <div className="fbiMain">
                <ArtCrimesMaterial wanted={searchStringValue} />
            </div>
        )
    }
}
export default OneForAll;