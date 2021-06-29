import React from 'react';
import { NavLink } from 'react-router-dom';

const SampleModuleNavLink = ({base_url, size}) => {
    return (
        <NavLink className={"tile " + size} to={base_url + ""}>
            Application vide
        </NavLink>
    );
};

export default SampleModuleNavLink;