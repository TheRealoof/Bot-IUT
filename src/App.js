import './App.scss';

import { BrowserRouter, Switch, Route } from "react-router-dom"
import Error_404 from './pages/core/Error_404';
import Home from './pages/core/Home';
import DiscordRedirect from './pages/core/Redirect';
import Dashbaord from './pages/core/Dashbaord';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/dashboard" component={Dashbaord}/>
                <Route path="/redirect" exact component={DiscordRedirect}/>
                <Route component={Error_404}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
