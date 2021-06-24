import React from 'react';
import { NavLink } from 'react-router-dom';

const PollsNavLink = () => {
    return (
        <NavLink exact to="/dashboard/polls">
            Sondages
        </NavLink>
    );
};

export default PollsNavLink;