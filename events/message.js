module.exports = (message) => {
    if (message.content === 'ping') {
        var now = Date.now();
        var sendTime = message.createdAt.valueOf()
        var ping = now - sendTime
        message.channel.send('pong, ' + ping + "ms");
    }
}