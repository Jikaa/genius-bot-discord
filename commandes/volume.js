exports.run = async (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);

    if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');
    if (msg.member.voiceChannel !== msg.guild.me.voiceChannel) return msg.channel.send('Vous n\'êtes pas connecté au même salon vocal');
    if (args[0] === 'defaut') { fetched.vlm = 25; }
    else if (args[0] < 0 || args[0] > 200) return msg.channel.send(`Valeur '${args[0]}' hors des limites 0-200`);
    else if (!args[0] || !isFinite(args[0])) return msg.channel.send("Utilisation de la commande volume ```volume <0-200> | defaut (par défaut 25)```");
    else { fetched.vlm = args[0]; }

    fetched.dispatcher.setVolume((fetched.vlm/100));

}