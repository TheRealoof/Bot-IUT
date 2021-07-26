import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PollNavLink from './PollNavLink';
import axios from 'axios';
import '../../core/styles/App.scss'
import './Polls.scss';

const Polls = () => {
    const [polls, setPolls] = useState([]);
    const {server_id} = useParams();

    useEffect( () => {
        const source = axios.CancelToken.source()
        axios.get(process.env.REACT_APP_API + "/polls", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            },
            params: {
                guildid: server_id,
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

    return (
        <div className="app">
            <h1>Sondages</h1>
            {
                polls.map((poll) => {
                    return (
                        <PollNavLink key={poll.messageId} poll={poll}/>
                    );
                })
            }
        </div>
    );
};

export default Polls;