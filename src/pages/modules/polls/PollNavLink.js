import { React } from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PollNavLink = ({poll}) => {
    const {server_id} = useParams();
    const base_url = "/dashboard/" + server_id + "/polls";

    if (!poll.deleted)
        poll.poll.responses.sort(function (a, b) {
            
            return b.votes - a.votes;
        });

    
    return (
        <NavLink className="poll-nav-link" to={base_url + "/" + poll.messageId}>
            <p className="q">{poll.poll.message}</p>

            {( () => {
                if (poll.deleted)
                    return (<p className="error">Données indisponibles</p>);
                else if (poll.poll.totalVotes === 0)
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
