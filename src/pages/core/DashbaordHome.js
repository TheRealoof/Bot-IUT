import { React, useEffect, useState } from 'react';
import ModulesNavLinks from '../modules/ModulesNavLinks';
import './styles/DashboardHome.scss';

const DashbaordHome = ({discordUser}) => {
    const [username, setUsername] = useState("");
    const [discriminator, setDiscriminator] = useState("");
    const [avatar, setAvatar] = useState("");
    
    useEffect (() => {
        if (discordUser)
        {
            setUsername(discordUser.username);
            setDiscriminator("#" + discordUser.discriminator);
            setAvatar("https://cdn.discordapp.com/avatars/" + discordUser.id + "/" + discordUser.avatar + ".png?size=128");
        }
    }, [discordUser]);

    return (
        <>
            <div className="title">
                <h1>Li Robo</h1>
            </div>
            <div className="profile">
                <img src={avatar} alt="Avatar" className="avatar"></img>
                <div className="tag">
                    <p>{username}</p>
                    <p>{discriminator}</p>
                </div>
            </div>
            <div className="tiles">
                <ModulesNavLinks/>
            </div>
        </>
    );
};

export default DashbaordHome;