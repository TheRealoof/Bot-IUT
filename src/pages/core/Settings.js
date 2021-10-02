import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiRequest from './functions/ApiRequest';
import './styles/App.scss'
import './styles/Settings.scss'

const Settings = () => {
    const {server_id} = useParams();
    const [apps, setApps] = useState();

    useEffect( () => {
        ApiRequest("/server-apps", (res) => {
            console.log(res.data);
            setApps(res.data);
        }, { server_id: server_id })
    }, [server_id]);

    return (
        <div className="app">
            <h1>Paramètres</h1>
            <p className="setting_name">Général</p>
            <p>Préfixe<input type="text"></input></p>
            <p className="setting_name">Sondages</p>
            <p>Activer<input type="checkbox"></input></p>
            <input type="button" value="Appliquer"></input>
        </div>
    );
};

export default Settings;