import React, {FunctionComponent, useEffect, useState } from "react";

const BASE_URL = "https://api.github.com/search/users?q=";

const UserSearch:FunctionComponent = () => {
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

    const userCards = results?.map((user:any) => 
        <li key={user.id}><a href={user.html_url}>{user.login}</a></li>
    );

    return(
        <>
            <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event?.target.value)} aria-label="Search Box" autoFocus></input>
            <input type="button" value="Search" onClick={() => setQuery(searchTerm)}></input>
            <ul id="users-list">{userCards}</ul>
        </>
    );
}

export default UserSearch;