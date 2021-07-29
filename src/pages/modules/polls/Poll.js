import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../core/styles/App.scss'
import './Polls.scss';
import Loading from '../../core/Loading';
import PollResponse from './PollResponse';

const Poll = () => {
    const {server_id} = useParams();
    const {poll_id} = useParams();
    const [poll, setPoll] = useState(undefined);

    useEffect( () => {
        const source = axios.CancelToken.source()
        axios.get(process.env.REACT_APP_API + "/poll", {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
            },
            params: {
                guildid: server_id,
                pollid: poll_id,
            },
            cancelToken: source.token
        })
        .then( (res) => {
            setPoll(res.data);
        })
        .catch( (error) => {
            if (error.response)
                console.log(error.response.status);
        });

        return () => {
            source.cancel();
        }
    }, [server_id, poll_id, poll]);
    if (poll)
        return (
            <div className="app poll">
                <h1 className="q">{poll.poll.message}</h1>
                <a className="discord-link" href={"https://discord.com/channels/" + poll.guildId + "/" + poll.channelId + "/" + poll.messageId}>Voir dans discord.</a>
                <p className="nb-votes">{poll.poll.totalVotes + ((poll.poll.totalVotes < 2) ? " vote." : " votes.")}</p>
                <div className="answers">
                    {
                        poll.poll.responses.map( (response, index) => {
                            return (
                                <PollResponse key={response._id} poll={poll} i={index}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    else
        return (
            <Loading/>
        )
};

export default Poll;