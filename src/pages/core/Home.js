import React from 'react';
import  { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Li Robo</h1>
            <NavLink to='/dashboard/'>Acceder au tableau de bord</NavLink>
        </div>
    );
};

export default Home;