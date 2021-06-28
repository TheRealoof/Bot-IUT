import React from 'react';
import { NavLink } from 'react-router-dom';

const PollsNavLink = ({base_url}) => {
    return (
        <NavLink to={base_url + "/polls"}>
            Sondages
        </NavLink>
    );
};

export default PollsNavLink;