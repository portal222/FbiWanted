import React, { useState } from "react";
import fallback from "../../public/assets/img/fallback.png";

const FbiDetails = (props) => {

    const [activeImage, setActiveImage] = useState(null);

    const handleImageClick = (url) => {
        setActiveImage(url);
    };

    const fbiWanted = props.fbiFbi

    return (
        <>
            <div>
                <div className="gridImg">
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

                {activeImage && (
                    <div className="lightbox" onClick={() => setActiveImage(null)}>
                        <img src={activeImage} alt="" className="lightbox-img" />
                    </div>
                )}

                <div className="mainDesc">
                    <div >
                        {fbiWanted.description && (
                            <>
                                <div className="title">Description</div>
                                <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.description }}></div>
                            </>
                        )}
                        {fbiWanted.details && (
                            <>
                                <div className="title">Details</div>
                                <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.details }}></div>
                            </>
                        )}
                        {fbiWanted.caution && (
                            <>
                                <div className="title">Caution</div>
                                <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.caution }}></div>
                            </>
                        )}
                    </div>
                    <div >
                        {fbiWanted.remarks && (
                            <>
                                <div className="title">Remarks</div>
                                <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.remarks }}></div>
                            </>
                        )}
                        {fbiWanted.warning_message && (
                            <>
                                <div className="title">Warning mesage</div>
                                <div className="descriptionW" dangerouslySetInnerHTML={{ __html: fbiWanted.warning_message }}></div>
                            </>
                        )}
                        {fbiWanted.reward_text && (
                            <>
                                <div className="title">Reward text</div>
                                <div className="descriptionR" dangerouslySetInnerHTML={{ __html: fbiWanted.reward_text }}></div>
                            </>
                        )}
                        <div className="modified">Date modified: {fbiWanted.modified}</div>
                    </div>
                </div>
            </div></>
    )
}
export default FbiDetails;