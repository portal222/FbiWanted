import React, { useState } from "react";

const FbiDetails = (props) => {


    const fbiWanted = props.fbiFbi


    console.log("fbi iz propsa", fbiWanted);
    return (
        <>
            <div>
                <div className="gridImg">
                    {fbiWanted.images.map((fbiImg) => (
                        <div className="dropDown">
                            <img src={fbiImg?.original} alt="no picture" className="fbiImg"/>
                            <div className="dropdownImg">
                                <img src={fbiImg?.original} className="imgFbi" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mainDesc">

                    <div >
                        <div className="title">Description</div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.description }}></div>
                        <div className="title">Details</div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.details }}></div>
                        <div className="title">Caution</div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.caution }}></div>

                    </div>
                    <div >
                        <div className="title">Remarks</div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.remarks }}></div>
                        <div className="title">Warning mesage</div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.warning_message }}></div>
                        <div className="title">Reward text</div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: fbiWanted.reward_text }}></div>

                    </div>

                </div>

            </div></>
    )

}
export default FbiDetails;