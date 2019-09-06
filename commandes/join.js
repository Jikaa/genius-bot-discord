exports.run = (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);

    if (fetched) return msg.channel.send('Le bot est utilisé dans un autre salon');
    if (!msg.member.voiceChannel) return msg.channel.send('Vous n\'êtes connecté à aucun salon vocal');
    if (msg.member.voiceChannel === msg.guild.me.voiceChannel) return msg.channel.send('Le bot est déjà présent dans ce salon');

    msg.member.voiceChannel.join()
    .then(msg.channel.send(`Le bot a rejoint le salon ${msg.member.voiceChannel.name}`))

}