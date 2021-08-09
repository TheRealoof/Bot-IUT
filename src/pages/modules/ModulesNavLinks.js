import React from 'react';
import PollsNavLink from "./polls/PollsNavLink"
import { useParams } from 'react-router';
import SampleModuleNavLink from './sample-module/SampleModuleNavLink';

const ModulesNavLinks = ({server}) => {
    const {server_id} = useParams();

    console.log(server);

    const base_url = "/dashboard/" + server_id;

    return (
        <>
            <PollsNavLink base_url={base_url}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"medium"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"medium"}/>
            <SampleModuleNavLink base_url={base_url} size={"large"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"large"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"medium"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"large"}/>
            <SampleModuleNavLink base_url={base_url} size={"large"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
            <SampleModuleNavLink base_url={base_url} size={"medium"}/>
            <SampleModuleNavLink base_url={base_url} size={"small"}/>
        </>
    );
};

export default ModulesNavLinks;