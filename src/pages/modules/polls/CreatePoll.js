import React from 'react';

const CreatePoll = () => {
    return (
        <div className="app create-poll">
            <h1>Créer un sondage</h1>
            <p className="">Question</p>
            <input type="text"></input>
            <p className="">Réponses</p>
            <p>1️⃣</p>
            <input type="text"></input>
            <button>Créer</button>
        </div>
    );
};

export default CreatePoll;