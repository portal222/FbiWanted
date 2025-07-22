import React from "react";
import { GridLoader } from 'react-spinners';

const Loader = () => {

    return (
        <div className="loader">
            <GridLoader
                size={17}
                color='rgba(191, 191, 197, 1)'
                speedMultiplier='1.7'
                margin={10}
            />
        </div>
    )
}
export default Loader;