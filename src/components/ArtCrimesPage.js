import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BackToTop from "./BackToTop";
import Loader from "./Loader";

const ArtCrimesPage = () => {

    const [wanted, setWanted] = useState([]);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([])
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        getWanted(page);
    }, [page]);

    const getWanted = async () => {

        const urlFbi = `https://api.fbi.gov/artcrimes/list?pageSize=10&page=${page}`;

        try {
            const responseFbi = await axios.get(urlFbi);
            const dataFbi = responseFbi.data.items;
            const dataT = responseFbi.data.total

            setWanted(dataFbi);
            setImages(dataFbi.images)
            setResults(dataFbi.length);
            setTotal(dataT);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const handleImageClick = (url) => {
        setActiveImage(url);
    };

    const totalPages = Math.ceil(total / 10);

    if (isLoading) {
        return <Loader />
    } else if (results == 0) {
        return (
            <div className="fbiMain">
                <div className="paddings"></div>
                <p>Nothing found</p>
            </div>
        )
    }

    return (
        <>
            <div className="fbiMain">
                <div className="fbiMain">
                    <div className="paddings"></div>
                    <p className="results">
                        {total} results
                    </p>
                </div>
                {wanted.map((fbiWanted, id) => (
                    <div key={id} className="fbiMain">
                        <div className="header">
                            <div className="titleMain">{fbiWanted.maker}</div>
                            <div className="subjects">{fbiWanted.crimeCategory}</div>
                        </div>
                        <div className="header">
                            <div className="titleMain">{fbiWanted.title}</div>
                        </div>
                        <div className="body">
                            <div>
                                <table>
                                    <tbody>
                                        {fbiWanted.materials && (
                                            <tr>
                                                <td className="fbiTd">Materials: </td>
                                                <td className="measurement">{fbiWanted.materials} </td>
                                            </tr>
                                        )}
                                        {fbiWanted.period && (
                                            <tr>
                                                <td className="fbiTd">Period: </td>
                                                <td className="national">{fbiWanted.period} </td>
                                            </tr>
                                        )}
                                        {fbiWanted.measurements && (
                                            <tr>
                                                <td className="fbiTd">Measurements:</td>
                                                <td className="measurement">{fbiWanted.measurements}</td>
                                            </tr>
                                        )}
                                        {fbiWanted.isStealth && (
                                            <tr>
                                                <td className="fbiTd">Is stealth:</td>
                                                <td className="national"> {fbiWanted.isStealth}</td>
                                            </tr>
                                        )}
                                        {fbiWanted.referenceNumber && (
                                            <tr>
                                                <td className="fbiTd">Number: </td>
                                                <td className="national">{fbiWanted.referenceNumber}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div>
                                    {fbiWanted.additionalData && (
                                        <>
                                            <div className="additional">additional Data: </div>
                                            <div className="addiText">{fbiWanted.additionalData}</div>
                                        </>
                                    )}
                                </div>
                                <div >
                                    {fbiWanted.description && (
                                        <>
                                            <div className="additional">Description</div>
                                            <div className="addiText" dangerouslySetInnerHTML={{ __html: fbiWanted.description }}></div>
                                        </>
                                    )}
                                </div>
                                <div className="modiArt">Date modified: {fbiWanted.modified}</div>
                            </div>
                            <div className="imgArt">
                                {fbiWanted.images.map((fbiImg, id) => {
                                    const imgUrl = fbiImg.large;
                                    return (
                                        <div key={id} >
                                            <img
                                                src={imgUrl || fallback}
                                                alt=" "
                                                className="fbiImg"
                                                onClick={() => imgUrl && handleImageClick(imgUrl)}
                                                onError={(e) => {
                                                    if (!e.target.src.includes(fallback)) {
                                                        e.target.src = fallback;
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div >
                            <hr></hr>
                            <hr></hr>
                        </div>
                    </div>
                ))}

                {activeImage && (
                    <div className="lightbox" onClick={() => setActiveImage(null)}>
                        <img src={activeImage} alt="" className="lightbox-img" />
                    </div>
                )}
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
            </div>
            <BackToTop />
        </>
    )
}
export default ArtCrimesPage;