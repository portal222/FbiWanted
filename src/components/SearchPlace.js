import React from "react";
import SearchOffices from "./SearchOffices";
import SearchTitle from "./SearchTitle";
import SearchPage from "./SearchPage";

const SearchPlace = () => {

    return (
        <div className="searchPlace">
        
            <div className="input">
                <SearchOffices placeholder={'Field Offices '} linkTo={'/offices'} />
                <SearchTitle placeholder={'Name'} linkTo={'/title'} />
                <SearchPage placeholder={'Page num 1-50'} linkTo={'/page'} />
            </div>
        </div>
    )

}
export default SearchPlace;