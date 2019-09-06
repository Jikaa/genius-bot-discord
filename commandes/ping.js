exports.run = async (client, msg, args, ops) => {

    m = await msg.channel.send(`Latence de l'API ~${Math.round(client.ping)}ms`);
    msg.channel.send(`Latence du bot ~${m.createdTimestamp - msg.createdTimestamp}ms`);
    
}