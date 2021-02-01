exports.run = (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);

    if (fetched) return msg.channel.send('Le bot est utilisé dans un autre salon');
    if (!msg.member.voice.channel) return msg.channel.send('Vous n\'êtes connecté à aucun salon vocal');
    if (msg.member.voice.channel === msg.guild.me.voice.channel) return msg.channel.send('Le bot est déjà présent dans ce salon');

    msg.member.voice.channel.join()
    .then(msg.channel.send(`Le bot a rejoint le salon ${msg.member.voice.channel.name}`))

}