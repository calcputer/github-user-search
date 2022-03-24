import React, {useEffect, useState } from "react";
import UserCard from "./UserCard";
import './UserSearch.css';

const BASE_URL = "https://api.github.com/search/users?per_page=10&q=";

const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<[]>([]);

    useEffect(() => {
        if(query.length > 0){
            fetch(BASE_URL + query)
            .then((result) => result.json())
            .then((data) => setResults(data.items)); 
        } else {
            setResults([]);
        }
    }, [query]);

    const userCards = results.length > 0 ? results?.map((user:any) => 
        <>
            <UserCard data={user} key={user.id}/>
            <br/>
        </>
    ) : <p id="no-results-label">No users found for query: {query}</p>;

    return(
        <>
            <div className="search-container">
                <input className="search-box" type="text" value={searchTerm} onChange={(event) => setSearchTerm(event?.target.value)} aria-label="Search Box" autoFocus/>
                <input className="search-button" type="button" value="Search" onClick={() => setQuery(searchTerm)}/>
            </div>
            {query.length > 0 && <div id="users-list">
                {userCards}
            </div>}
        </>
    );
}

export default UserSearch;