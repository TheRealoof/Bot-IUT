import React from 'react';
import "./styles/Loading.scss"

const Loading = () => {
    return (
        <div className="loading">
            <img src="/loading.gif" alt="Chargement..."/>
        </div>
    );
};

export default Loading;