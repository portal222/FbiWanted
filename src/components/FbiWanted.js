import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FbiDetails from "./FbiDetails";
import SearchPlace from "./SearchPlace";
import GlobalContext from "./GlobalContext";
import BackToTop from "./BackToTop";




const FbiWanted = () => {

    const [wanted, setWanted] = useState([]);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;


    useEffect(() => {
        getWanted(searchStringValue);
    }, [searchStringValue]);
    // useEffect(() => {
    //     getWanted();
    // }, []);

    console.log("trazeni FBi broj", searchStringValue);

    const getWanted = async () => {

        // const urlFbi = `https://api.fbi.gov/wanted/v1/list?page=1`;
        // const urlFbi = `https://api.fbi.gov/wanted/v1/list?title=${searchStringValue}`;
        const urlFbi = `https://api.fbi.gov/wanted/v1/list?field_offices=${searchStringValue}`;

        try {
            const responseFbi = await axios.get(urlFbi);

            const dataFbi = responseFbi.data.items;
            const samoProba = responseFbi.data
            console.log("novi api FBI baza", dataFbi);

            setWanted(dataFbi);
            setImages(dataFbi.images)
            setResults(dataFbi.length);
            setTotal(samoProba);


            console.log("fbi wanted komp podaci", dataFbi);
            console.log("FBI pocetak", samoProba);

        } catch (err) {
            setError(err);
        }
    }
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
                {wanted.map((fbiWanted) => (
                    <div className="fbiMain">
                        <div className="header">
                            <div colSpan={2} className="titleMain">{fbiWanted.title}</div>
                            <div className="subjects">{fbiWanted.subjects}</div>
                            <div className="modified">Date modified: {fbiWanted.modified}
                                <br></br>
                                Path: {fbiWanted.path}</div>
                        </div>
                        <div className="body">
                            <table>
                                <tbody>

                                    <tr>
                                        <td rowSpan={4}
                                            className="fbiAliases">
                                            <ul>
                                                <li style={{ color: "gray", fontWeight: "normal", fontSize: "18px" }}>Aliases:</li>
                                                <li>
                                                    {fbiWanted.aliases?.[0]}
                                                </li>
                                                <li>
                                                    {fbiWanted.aliases?.[1]}
                                                </li>
                                                <li>
                                                    {fbiWanted.aliases?.[2]}
                                                </li>
                                                <li>
                                                    {fbiWanted.aliases?.[3]}
                                                </li>
                                                <li>
                                                    {fbiWanted.aliases?.[4]}
                                                </li>

                                            </ul>
                                        </td>
                                        <td className="fbiTd">Nationality:</td>
                                        <td className="national"> {fbiWanted.nationality}</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Place of birth: </td>
                                        <td className="national">{fbiWanted.place_of_birth}</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Date of birth:</td>
                                        <td className="national"> {fbiWanted.dates_of_birth_used}</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Age: </td>
                                        <td className="national">{fbiWanted.age_range}</td>
                                    </tr>

                                </tbody>
                            </table>

                            <table>
                                <tbody>
                                    <tr>
                                        <td className="fbiTd">Race:</td>
                                        <td className="national"> {fbiWanted.race}</td>
                                        <td className="fbiTd">Height: </td>
                                        <td className="national">{(fbiWanted.height_max * 2.54).toFixed(1)} cm</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Race raw: </td>
                                        <td className="national">{fbiWanted.race_raw}</td>
                                        <td className="fbiTd">Weight: </td>
                                        <td className="national">{fbiWanted.weight}</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Sex:  </td>
                                        <td className="national">{fbiWanted.sex}</td>
                                        <td className="fbiTd">Status: </td>
                                        <td className="national">{fbiWanted.status}</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Hair:  </td>
                                        <td className="national"> {fbiWanted.hair}</td>
                                        <td className="fbiTd">Clacification: </td>
                                        <td className="national">{fbiWanted.person_classification} </td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Hair raw: </td>
                                        <td className="national">{fbiWanted.hair_raw}</td>
                                        <td className="fbiTd">Offices: </td>
                                        <td className="national">{fbiWanted.field_offices}</td>
                                    </tr>
                                    <tr>
                                        <td className="fbiTd">Eyes:  </td>
                                        <td className="national">{fbiWanted.eyes}</td>
                                        <td className="fbiTd">Files:</td>
                                        <td className="national"><a href={fbiWanted.files[0].url} target="_blanc">PDF files</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>



                        <div>

                            <FbiDetails fbiFbi={fbiWanted} />
                        </div>



                        <div >
                            <hr></hr>
                            <hr></hr>
                        </div>


                    </div>

                ))}

            </div>
            <BackToTop />
        </>
    )
}
export default FbiWanted;