import { React, useEffect, useState } from 'react';
import { Switch, useParams, Route } from 'react-router-dom';
import PollNavLink from './PollNavLink';
import Poll from './Poll';
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
        <Switch>
            <Route path="/dashboard/:server_id/polls/:poll_id" component={props => <Poll/>}/>
            <Route path="/dashboard/:server_id/polls" exact component={props => 
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
            }/>
        </Switch>
    );
};

export default Polls;