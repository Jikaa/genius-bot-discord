exports.run = (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);

    if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');
    if (msg.member.voiceChannel !== msg.guild.me.voiceChannel) return msg.channel.send('Vous n\'êtes pas dans le même salon vocal');

    fetched.dispatcher.resume();
    msg.channel.send(':arrow_forward:');

}