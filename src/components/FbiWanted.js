import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FbiDetails from "./FbiDetails";
import BackToTop from "./BackToTop";
import Loader from "./Loader";

const FbiWanted = (props) => {

    const [wanted, setWanted] = useState([]);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    const offices = props.wanted

    useEffect(() => {
        getWanted(offices, page);
    }, [offices, page]);

    const getWanted = async () => {

        const urlFbi = `https://api.fbi.gov/wanted/v1/list?field_offices=${offices}&pageSize=10&page=${page}`;

        try {
            const responseFbi = await axios.get(urlFbi);
            const dataFbi = responseFbi.data.items;
            const forTotal = responseFbi.data.total;

            setWanted(dataFbi);
            setImages(dataFbi.images)
            setResults(dataFbi.length);
            setTotal(forTotal);
            setIsLoading(false);
        } catch (err) {
            setError(err);
        }
    }

    const totalPages = Math.ceil(total / 10);

    if (isLoading) {
        return <Loader />
    } else if (results == 0) {
        return (
            <div className="fbiMain">
                <div className="paddings"></div>
                <p className="results"> {offices} not found</p>
            </div>
        )
    }

    return (
        <>
            <div>
                <div className="fbiMain">
                    <div className="paddings"></div>
                    <p className="results">
                        {total} results for {offices}
                    </p>
                </div>
                {wanted.map((fbiWanted, id) => (
                    <div key={id} className="fbiMain">
                        <div className="header">
                            <div colSpan={2} className="titleMain">{fbiWanted.title}</div>
                            <div className="subjects">{fbiWanted.subjects}</div>
                            <div className="modified">Date modified: {fbiWanted.modified}
                            </div>
                        </div>
                        <div className="body">
                            {fbiWanted.aliases?.[0] && (
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="fbiTdAl">Aliases:</td>
                                        </tr>
                                        <tr>
                                            <td
                                                className="fbiAliases">
                                                <ul>
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
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            <table>
                                <tbody>
                                    {fbiWanted.person_classification && (
                                        <tr>
                                            <td className="fbiTd">Clacification: </td>
                                            <td className="national">{fbiWanted.person_classification} </td>
                                        </tr>
                                    )}
                                    {fbiWanted.languages && (
                                        <tr>
                                            <td className="fbiTd">Languages:</td>
                                            <td className="national">{fbiWanted.languages}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.nationality && (
                                        <tr>
                                            <td className="fbiTd">Nationality:</td>
                                            <td className="national"> {fbiWanted.nationality}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.place_of_birth && (
                                        <tr>
                                            <td className="fbiTd">Place of birth: </td>
                                            <td className="national">{fbiWanted.place_of_birth}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.dates_of_birth_used && (
                                        <tr>
                                            <td className="fbiTd">Date of birth:</td>
                                            <td className="national"> {fbiWanted.dates_of_birth_used}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.age_range && (
                                        <tr>
                                            <td className="fbiTd">Age: </td>
                                            <td className="national">{fbiWanted.age_range}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    {fbiWanted.race && (
                                        <tr>
                                            <td className="fbiTd">Race:</td>
                                            <td className="national"> {fbiWanted.race}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.race_raw && (
                                        <tr>
                                            <td className="fbiTd">Race raw: </td>
                                            <td className="national">{fbiWanted.race_raw}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.sex && (
                                        <tr>
                                            <td className="fbiTd">Sex:  </td>
                                            <td className="national">{fbiWanted.sex}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.hair && (
                                        <tr>
                                            <td className="fbiTd">Hair:  </td>
                                            <td className="national"> {fbiWanted.hair}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.hair_raw && (
                                        <tr>
                                            <td className="fbiTd">Hair raw: </td>
                                            <td className="national">{fbiWanted.hair_raw}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.eyes && (
                                        <tr>
                                            <td className="fbiTd">Eyes:  </td>
                                            <td className="national">{fbiWanted.eyes}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    {fbiWanted.height_max && (
                                        <tr>
                                            <td className="fbiTd">Height: </td>
                                            <td className="national">{(fbiWanted.height_max * 2.54).toFixed(1)} cm</td>
                                        </tr>
                                    )}
                                    {fbiWanted.weight_max && (
                                        <tr>
                                            <td className="fbiTd">Weight: </td>
                                            <td className="national">{(fbiWanted.weight_max * 0.4535).toFixed(1)} kg</td>
                                        </tr>
                                    )}
                                    {fbiWanted.scars_and_marks && (
                                        <tr>
                                            <td className="fbiTd">Marks:</td>
                                            <td className="national">{fbiWanted.scars_and_marks}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.status && (
                                        <tr>
                                            <td className="fbiTd">Status: </td>
                                            <td className="national">{fbiWanted.status}</td>
                                        </tr>
                                    )}
                                    {fbiWanted.field_offices && (
                                        <tr>
                                            <td className="fbiTd">Offices: </td>
                                            <td className="national">{fbiWanted.field_offices}</td>
                                        </tr>
                                    )}
                                    <tr>
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
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div className={page === i + 1 ? 'numbAct' : 'numb'}
                        key={i + 1}
                        onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    )
}
export default FbiWanted;