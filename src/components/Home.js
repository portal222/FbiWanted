import React from "react";

const Home = () => {

    return (
        <>
            <div className="fbiMain">
                <div className="homeDiv">
                    <p className="homeTitle">
                        FEDERAL BUREAU OF INVESTIGATION
                    </p>
                    <p className="homePage">
                        This page contains information released by the FBI on wanted persons,
                        missing persons or those with criminal records.
                        <br></br>
                        As well as information on stolen works of art.
                        <br></br>
                        <br></br>
                        You can search by the names of the wanted persons,
                        by field offices locations , and stolen art by material or by category.
                        <br></br>
                        <br></br>
                        When searching for field offices locations,
                        they should be written together with lowercase letters
                        for example, lasvegas. and other search must be with lowercase letters
                    </p>
                </div>
            </div>
        </>
    )
}
export default Home;