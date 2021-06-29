import React from 'react';
import { NavLink } from 'react-router-dom';
import './Polls.scss';

const PollsNavLink = ({base_url}) => {
    return (
        <NavLink className="polls tile large" to={base_url + "/polls"}>
            Sondages
            <div className="preview-poll">
                <p className="q">{"IN > IP ?"}</p>
                <div className="answers">
                    <p className="a">Oui</p>
                    <div className="a" style={{width:'100%'}}><p>100%</p></div>
                    <p className="a">Non</p>
                    <div className="a" style={{width:'0%'}}><p>0%</p></div>
                </div>
            </div>
        </NavLink>
    );
};

export default PollsNavLink;