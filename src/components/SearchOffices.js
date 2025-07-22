import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import { Paper, InputBase, IconButton } from "@mui/material";

const SearchOffices = (props) => {

    const globalCtx = useContext(GlobalContext);

    const navigate = useNavigate();
    const searchString = useRef();

    const handleClickSearch = () => {
        if (searchString.current.value.trim().length === 0) {
            return false;
        }
        globalCtx.setSearchStringFn(searchString.current.value.trim());
        navigate(props.linkTo);
        {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClickSearch();
        }
    };

    return (

        <Paper
            component='form'
            se={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '30rem',
                fontSize: '28px'
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.placeholder}
                inputRef={searchString}
                onKeyDown={handleKeyDown}
            />
            <IconButton
                type='button'
                onClick={handleClickSearch}
                sx={{ p: '3px' }}
                aria-label='search'
            >
                ❔
            </IconButton>
        </Paper>
    )
}
export default SearchOffices;