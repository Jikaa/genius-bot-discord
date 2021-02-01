exports.run = async (client, msg, args, ops) => {

    m = await msg.channel.send(`Latence de l'API ~${Math.round(client.ws.ping)}ms`);
    msg.channel.send(`Latence au bot ~${m.createdTimestamp - msg.createdTimestamp}ms`);
    
}