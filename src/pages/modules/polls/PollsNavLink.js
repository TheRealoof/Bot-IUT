import { React, useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PollsNavLinkPreview from './PollsNavLinkPreview';
import axios from 'axios';
import './Polls.scss';

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
        setPreview(<PollsNavLinkPreview poll={previewObject.poll}/>);
    }

    useEffect( () => {
        updatePreview();
        const interval = setInterval(updatePreview, 5000)

        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [polls]);

    return (
        <NavLink className="polls tile large" to={base_url + "/polls"}>
            Sondages
            {preview}
        </NavLink>
    );
};

export default PollsNavLink;