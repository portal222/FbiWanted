import React from "react";

const paginateProba = (games, pageSize) => {

    console.log("iz paginationMui konzola", games)

    const pageCount = Math.ceil(games.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
games.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default paginateProba;