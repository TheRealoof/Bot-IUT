import React from 'react'

const PollResponse = ({response}) => {
    console.log(response)
    return (
        <div className="a">
            <p className="a">{response.response}</p>
            <div>
                <p>{response.votes}</p>
            </div>
        </div>
    )
}

export default PollResponse
