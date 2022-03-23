import React, {FunctionComponent, useState } from "react";
const UserSearch:FunctionComponent = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    return(
        <>
            <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event?.target.value)} aria-label="Search Box"></input>
            <input type="button" value="Search" onClick={() => console.log("searching for " + searchTerm)}></input>
        </>
    );
}

export default UserSearch;