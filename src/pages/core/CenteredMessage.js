import React from 'react';
import './styles/CenteredMessage.scss';

const CenteredMessage = ({message}) => {
    return (
        <div className="centered-message">
            <p>{message}</p>
        </div>
    );
};

export default CenteredMessage;