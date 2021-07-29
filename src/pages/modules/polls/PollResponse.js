import { React, useEffect, useState } from 'react'
import AnimatedValue from '../../core/classes/AnimatedValue';

const PollResponse = ({poll, i}) => {
    const [percent] = useState(new AnimatedValue(0));

    useEffect( () => {
        percent.speed = 75;
        percent.onNewFrame = () => {
            document.getElementById('poll-percent-p-'+i).innerHTML = Math.trunc(percent.value) + '%'
            document.getElementById('poll-percent-div-'+i).style.width = (percent.value) + '%'
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect( () => {
        percent.start();
        if (poll.poll.totalVotes === 0)
            percent.update(0)
        else if (!poll.deleted)
            percent.update( (poll.poll.responses[i].votes/poll.poll.totalVotes) * 100);

        return () => {
            percent.stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [poll]);

    return (
        <div className="a">
            <p className="a">{poll.poll.responses[i].response}</p>
            <div className="percent-container">
                <div id={"poll-percent-div-"+i} className="percent" style={{width: percent.value + "%"}}>
                    <p id={"poll-percent-p-"+i}>{(!poll.deleted) ? Math.trunc(percent.value) + "%" : "--"}</p>
                </div>
            </div>
        </div>
    )
}

export default PollResponse
