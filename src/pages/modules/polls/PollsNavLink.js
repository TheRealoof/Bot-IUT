import { React, useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import './Polls.scss';

const PollPreview = ({poll}) => {
    console.log(poll);
    return (
        <div className="preview-poll">
            <p className="q">{poll.message}</p>
            <div className="answers">
                <p className="a">{poll.responses[0].response}</p>
                <div className="a" style={{width:'100%'}}><p>100%</p></div>
                <p className="a">{poll.responses[1].response}</p>
                <div className="a" style={{width:'0%'}}><p>0%</p></div>
            </div>
        </div>
    );
}

const PollsNavLink = ({base_url}) => {
    const [polls, setPolls] = useState([]);
    const {server_id} = useParams();

    useEffect( () => {
        const source = axios.CancelToken.source()
        axios.get(process.env.REACT_APP_API + "/polls", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            },
            params: {
                guildid: server_id
            },
            cancelToken: source.token
        })
        .then( (res) => {
            setPolls(res.data);
        })
        .catch( (error) => {
            if (error.response)
                console.log(error.response.status);
        });

        return () => {
            source.cancel();
        }
    }, [server_id]);

    const preview = (polls[0]) ? (
        <PollPreview poll={polls[0].poll}/>
    ) : (<></>);

    return (
        <NavLink className="polls tile large" to={base_url + "/polls"}>
            Sondages
            {preview}
        </NavLink>
    );
};

export default PollsNavLink;