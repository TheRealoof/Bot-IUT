import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PollNavLink = ({poll}) => {
    const [validData, setValidData] = useState(true);
    const [totalVotes, setTotalVotes] = useState(0);
    const {server_id} = useParams();
    const base_url = "/dashboard/" + server_id + "/polls";

    useEffect( () => {
        setValidData(true);

        let tmpTotalVotes = 0;
        for (const response of poll.poll.responses)
            if (response.votes !== undefined)
                tmpTotalVotes += response.votes;
            else
                setValidData(false);

        setTotalVotes(tmpTotalVotes);

        if (validData)
            poll.poll.responses.sort(function (a, b) {
                return b.votes - a.votes;
            });
    }, [validData, poll])
    
    return (
        <NavLink className="poll-nav-link" to={base_url + "/" + poll.messageId}>
            <p className="q">{poll.poll.message}</p>

            {( () => {
                if (!validData)
                    return (<p className="error">Données indisponibles</p>);
                else if (totalVotes === 0)
                    return (<p className="warning">Aucun vote</p>);
                else if (poll.poll.responses[0].votes === poll.poll.responses[1].votes)
                    return (<p className="warning">Égalité</p>);
                else
                    return (<p className="a">{ poll.poll.responses[0].response }</p>);
            })()}
        </NavLink>
    );
}

export default PollNavLink;
