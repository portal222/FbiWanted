import React, { useState, useEffect } from "react";
import paginateProba from "./PaginationMui";
import { Box, Typography, Pagination } from "@mui/material";


import axios from 'axios';






const FreeGames = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const [games, setGames] = useState([]);


    useEffect(() => {
        axios.get(`https://www.freetogame.com/api/games`).then(res => {
            const data = res.data;
            setGames(data);
            console.log("iz FreeGames podaci", data)


        });

    }, [])


    const pageSize = 4;
    const paginatedPosts = paginateProba(games, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];


    return (
        <Box>
                  {paginatedPosts.length > 1 && (
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                        count={paginatedPosts.length}
                        page={currentPage}
                        onChange={(_, newPage) => setCurrentPage(newPage)}
                    />
                </Box>
            )}
            {currentPosts &&
                currentPosts.map((post) => (
                    <div key={post.id} className="games">
                        <table >
                            <thead>
                                <tr>
                                    <th colSpan={2} className="title">
                                        {post.title}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{post.genre}</td>
                                    <td>{post.platform}</td>
                                </tr>
                                <tr>
                                    <td className="descript">{post.short_description}</td>
                                    <td> <img src={post.thumbnail} alt="no picture" className="image" /></td>
                                </tr>
                                <tr>
                                    <td>{post.publisher}</td>
                                    <td>{post.developer + " " + post.release_date}</td>
                                </tr>
                                <tr>
                                    <td><a href={post.freetogame_profile_url} target="_blank">Game profil</a></td>
                                    <td><a href={post.game_url} target="_blank">Play game</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <hr></hr>


                    </div>
                ))}
            {paginatedPosts.length > 1 && (
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                        count={paginatedPosts.length}
                        page={currentPage}
                        onChange={(_, newPage) => setCurrentPage(newPage)}
                    />
                </Box>
            )}
        </Box>
    );

}

export default FreeGames;