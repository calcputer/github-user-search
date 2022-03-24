import React, {useEffect, useState } from "react";
import UserCard from "./UserCard";
import './UserSearch.css';

const BASE_URL = "https://api.github.com/search/users?per_page=10&q=";
const PAGE_SIZE = 10;

const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const callSearchEndpoint = () => {
        setError(false);
        if(query.length > 0){
            setLoading(true);
            fetch(BASE_URL + query + "&page=" + page)
            .then((result) => result.json())
            .then((data) => {if(!data.items){setError(true)}; setResults(data.items); setTotalCount(data.total_count); setLoading(false)});
        } else {
            setResults([]);
        }
    }

    useEffect(() => {
        callSearchEndpoint();
    }, [query, page]);

    const userCards = !loading && !error && results.length > 0 ? results?.map((user:any) => 
        <>
            <UserCard data={user} key={user.id}/>
        </>
    ) : <p id="no-results-label">No users found for query: {query}</p>;

    const previousPageButton = page > 1 ? <button className="previous-button" onClick={() => setPage(page-1)}>Previous Page</button> : <></>;
    const nextPageButton = page < totalCount/PAGE_SIZE ? <button className="next-button" onClick={() => setPage(page+1)}>Next Page</button> : <></>;

    return(
        <>
            <div className="search-container">
                <input className="search-box" type="text" value={searchTerm} onChange={(event) => setSearchTerm(event?.target.value)} aria-label="Search Box" autoFocus/>
                <button className="search-button" onClick={() => {setQuery(searchTerm); setPage(1)}}>Search</button>
            </div>
            {loading ? <p>loading...</p> : <>
                {totalCount > 0 && <p className="paging-container">
                    Page {page}{previousPageButton}{nextPageButton}
                </p>}
                {error ? <p>Error loading data. (probably encountered github search API rate limiting, try again in a minute) <button onClick={callSearchEndpoint}>Retry</button></p> : <>
                    {query.length > 0 && <div id="users-list">
                        {userCards}
                    </div>}
                </>}
            </>}
        </>
    );
}

export default UserSearch;