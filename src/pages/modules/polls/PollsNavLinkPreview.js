import { React, useState, useEffect } from 'react';
import AnimatedValue from '../../core/classes/AnimatedValue';
import './Polls.scss';

const PollsNavLinkPreview = ({poll}) => {
    const [animationClass, setAnimationClass] = useState('in');
    const [validData, setValidData] = useState(true);
    const [percents] = useState([new AnimatedValue(0.0), new AnimatedValue(0.0)]);
    const twoChoices = poll.responses.length <= 2;

    useEffect( () => {
        setValidData(true);
        setAnimationClass('in');
        const transitionTimeout = setTimeout( () => {
            setAnimationClass('out');
        }, 4500);

        let totalVotes = 0;
        for (const response of poll.responses)
            if (response.votes !== undefined)
            {    
                totalVotes += response.votes;
            }
            else
                setValidData(false);

        if (!twoChoices)
        {
            poll.responses.sort(function (a, b) {
                return b.votes - a.votes;
            });
        }

        let percentTimeout;
        if (validData)
        {
            for (let i = 0; i < 2; i++)
            {
                percents[i].update(0);
                percents[i].value = 0;
                percents[i].start();
            }
            percentTimeout = setTimeout( () => {
                for (let i = 0; i < 2; i++)
                {
                    percents[i].update(Math.trunc(poll.responses[i].votes*100/totalVotes));
                    percents[i].onNewFrame = () => {
                        document.getElementById('poll_preview_percent_text_'+i).innerHTML = Math.trunc(percents[i].value) + '%'
                        document.getElementById('poll_preview_percent_div_'+i).style.width = (percents[i].value) + '%'
                    }
                }
            }, 200);
        }

        return () => {
            clearTimeout(transitionTimeout);
            clearTimeout(percentTimeout);
            percents[0].stop();
            percents[1].stop();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [poll, validData]);

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
                                    <div className="poll_preview_percent_div_container">
                                        <div id="poll_preview_percent_div_0" className="a" style={{width:'0%'}}>
                                            <p id="poll_preview_percent_text_0">0%</p>
                                        </div>
                                    </div>
                                    <p className="a">{poll.responses[1].response}</p>
                                    <div className="poll_preview_percent_div_container">
                                        <div id="poll_preview_percent_div_1" className="a" style={{width:'0%'}}>
                                            <p id="poll_preview_percent_text_1">0%</p>
                                        </div>
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

export default PollsNavLinkPreview;