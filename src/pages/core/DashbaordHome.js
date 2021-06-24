import { React, useEffect, useState } from 'react';
import ModulesNavLinks from '../modules/ModulesNavLinks';

const DashbaordHome = ({discordUser}) => {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    
    useEffect( () => {
        if (discordUser)
        {
            setUsername(discordUser.username);
            setAvatar("https://cdn.discordapp.com/avatars/" + discordUser.id + "/" + discordUser.avatar + ".png?size=128");
        }
    }, [discordUser]);

    return (
        <div>
            <h1>Dashbaord</h1>
            <img src={avatar} alt="Avatar"></img>
            <p>{username}</p>
            <p>Bienvenue sur le tableau de bord</p>
            <ModulesNavLinks/>
        </div>
    );
};

export default DashbaordHome;