import {useEffect, useState } from "react";
import './UserCard.css';

type UserCardProps = {
    data:any;
}

const UserCard = (props:UserCardProps) => {
    const [details, setDetails] = useState<any>({});

    useEffect(() => {
        if(props.data?.url.length > 0){
            fetch(props.data.url)
            .then((result) => result.json())
            .then((data) => {setDetails(data); console.log(data)}); 
        }
    }, [props]);
    
    const avatarImage = <img className="avatar-img" src={props.data.avatar_url} alt=""></img>;
    const displayName = !!details.name ? details.name + " - " : "";
    const bioText = !!details.bio ? details.bio + " - " : ""; 
    const starCount = !!details.stars ? details.stars + " stars - " : "";
    const followerCount = !!details.followers ? details.followers + " followers - " : "";
    const companyText = !!details.company ? details.company + " - " : "";
    const publicRepoCount = !!details.public_repos ? details.public_repos + " public repos - " : "";
    const profileLink = <a href={props.data.html_url} target="_blank">{props.data.login}</a>;

    return (
        <p className="user-card">
            {avatarImage}{displayName}{bioText}{starCount}{followerCount}{companyText}{publicRepoCount}{profileLink}
        </p>
    )
}

export default UserCard;