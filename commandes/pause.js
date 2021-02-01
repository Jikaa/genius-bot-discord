exports.run = (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);

    if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');
    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('Vous n\'êtes pas dans le même salon vocal');
    if (!fetched.dispatcher.paused) {
        fetched.dispatcher.pause(true);
        msg.channel.send(':pause_button:');
    } else {
        fetched.dispatcher.resume();
        msg.channel.send(':arrow_forward:');
    }

}