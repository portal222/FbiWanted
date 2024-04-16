import React from "react";
import WantedPage from "./WantedPage";
import { useNavigate } from "react-router-dom";


const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

  const navigate = useNavigate();


    const goToNextPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage + 1)
        console.log("Klik na sledecu stranu", currentPage)
    }
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const clickPage = (pageNum) => {
        const LinkTo = `/fbiPage/${pageNum}`;
        navigate(LinkTo);
    }
    return (
        <>
            <nav>
                <ul className="boje">
                    <li>
                        <a onClick={goToPrevPage}
                            href='#/wanted'>
                            previous
                        </a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                        className="lista">
                          {/* className={`page-item ${currentPage == pgNumber ? 'active' : ''}`}> */}
                            <p onClick={() => clickPage(pgNumber)}
                                // className='page-link'
                              >

                                {pgNumber}
                            </p>

                        </li>

                    ))}

                    <li className="page-item">
                        <a className="page-link"
                            onClick={goToNextPage}
                            href='#/wanted'>

                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default Pagination;