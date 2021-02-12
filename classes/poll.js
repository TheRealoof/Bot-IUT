class poll
{
    constructor(message)
    {
        this.message = message;
        this.responses = []
    }

    addResponse(response)
    {
        this.responses.push(response)
    }
}

module.exports = poll;