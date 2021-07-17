import { React, useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import './Polls.scss';

class AnimatedValue
{
    constructor(value)
    {
        this.value = value;
        this.targetValue = 100;
        this.speed = 200;
        this.currentTime = Date.now();
        this.onNewFrame = undefined;
        requestAnimationFrame(()=> {this.newFrame(this)});
    }

    update(value)
    {
        this.targetValue = value;
    }

    newFrame(object)
    {
        const frameTime = (Date.now() - object.currentTime)/1000;
        object.currentTime = Date.now();
        const addValue = frameTime*object.speed;
        if (Math.abs(object.value - object.targetValue) > addValue)
            object.value = object.value + ( (object.value < object.targetValue) ? (addValue) : (-addValue) );
        else
            object.value = object.targetValue;
        if (this.onNewFrame)
        {
            try {this.onNewFrame()} 
            catch (e) {}
        }
        requestAnimationFrame(()=> {object.newFrame(object)})
    }
}

const PollPreview = ({poll}) => {
    const [animationClass, setAnimationClass] = useState('in');
    const [validData, setValidData] = useState(true);
    const [totalVotes, setTotalVotes] = useState(0);
    const twoChoices = poll.responses.length <= 2;
    const [percents, setPercents] = useState([new AnimatedValue(0.0), new AnimatedValue(0.0)]);

    useEffect( () => {
        setAnimationClass('in');
        const timeout = setTimeout( () => {
            setAnimationClass('out');
        }, 4500);

        let nbVotes = 0;
        for (const response of poll.responses)
            if (response.votes !== undefined)
            {    
                nbVotes += response.votes;
                setTotalVotes(nbVotes);
            }
            else
                setValidData(false);

        if (!twoChoices)
        {
            poll.responses.sort(function (a, b) {
                return b.votes - a.votes;
            });
        }

        if (validData)
        for (let i = 0; i < 2; i++)
        {
            percents[i].update(Math.trunc(poll.responses[i].votes*100/totalVotes));
            percents[i].value = 0;
            percents[i].onNewFrame = () => {
                document.getElementById('poll_preview_percent_text_'+i).innerHTML = Math.trunc(percents[i].value) + '%'
                document.getElementById('poll_preview_percent_div_'+i).style.width = (percents[i].value) + '%'
            }
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [poll]);

    return (
        <div className={"preview-poll " + animationClass}>
            <div className="container">
                <p className="q">{poll.message}</p>
                <div className="answers">
                    {( () => {
                        if (validData)
                            return (
                                <>
                                    <p className="a">{poll.responses[0].response}</p>
                                    <div id="poll_preview_percent_div_0" className="a" style={{width:'0%'}}>
                                        <p id="poll_preview_percent_text_0">0%</p>
                                    </div>
                                    <p className="a">{poll.responses[1].response}</p>
                                    <div id="poll_preview_percent_div_1" className="a" style={{width:'0%'}}>
                                        <p id="poll_preview_percent_text_1">0%</p>
                                    </div>
                                    <p className="info">{ ( () => {
                                        if (!twoChoices)
                                        {
                                            const remaining = poll.responses.length - 2;
                                            return "+ " + remaining + " autre" + ((remaining > 1) ? "s" : "") + " réponse" + ((remaining > 1) ? "s" : "");
                                        }
                                    } )() }</p>
                                </>
                            )
                        else
                            return (
                                <p className="info">Impossible de récupérer les données</p>
                            )
                    })() }

                </div>
            </div>
        </div>
    );
}

const PollsNavLink = ({base_url}) => {
    const [polls, setPolls] = useState([]);
    const [preview, setPreview] = useState(<></>);
    const {server_id} = useParams();
    let previewObject = undefined;

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

    function updatePreview()
    {
        if (polls.length === 0) return;

        if (previewObject)
        {
            const actualPreviewObjectIndex = polls.indexOf(previewObject);
            if (actualPreviewObjectIndex >= 0)
            {
                previewObject = polls[(actualPreviewObjectIndex+1)%polls.length];
            }
            else
            {
                previewObject = polls[0];
            }
        }
        else
        {
            previewObject = polls[0];
        }
        setPreview(<PollPreview poll={previewObject.poll}/>);
    }

    useEffect( () => {
        updatePreview();
        const interval = setInterval(updatePreview, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [polls]);

    return (
        <NavLink className="polls tile large" to={base_url + "/polls"}>
            Sondages
            {preview}
        </NavLink>
    );
};

export default PollsNavLink;