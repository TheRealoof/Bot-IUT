import React from 'react';
import { NavLink } from 'react-router-dom';

const SettingsNavLink = ({base_url, size}) => {
    return (
        <NavLink className={"tile small"} to={base_url + "/settings"}>
            Parametres Administrateur
        </NavLink>
    );
};

export default SettingsNavLink;