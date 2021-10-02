import { React } from 'react';
import { Switch, Route } from 'react-router-dom';
import Polls from './Polls';
import CreatePoll from './CreatePoll';
import Poll from './Poll';

const PollsRouter = () => {
    return (
        <Switch>
            <Route path="/dashboard/:server_id/polls/create" component={props => <CreatePoll/>}/>
            <Route path="/dashboard/:server_id/polls/:poll_id" component={props => <Poll/>}/>
            <Route path="/dashboard/:server_id/polls" exact component={props => <Polls/>}/>
        </Switch>
    );
};

export default PollsRouter;