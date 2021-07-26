import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PollNavLink = ({poll}) => {
    const [validData, setValidData] = useState(true);
    const {server_id} = useParams();
    const base_url = "/dashboard/" + server_id + "/polls";

    useEffect( () => {
        setValidData(true);

        for (const response of poll.poll.responses)
            if (response.votes === undefined)
                setValidData(false);

        if (validData)
            poll.poll.responses.sort(function (a, b) {
                return b.votes - a.votes;
            });
    }, [validData, poll])
    
    return (
        <NavLink className="poll-nav-link" to={base_url + "/" + poll.messageId}>
            <p className="q">{poll.poll.message}</p>
            { (validData) ?
                <p className="a">{ poll.poll.responses[0].response }</p> :
                <p className="error">{ "Données indisponibles" }</p>
            }
        </NavLink>
    );
}

export default PollNavLink;
