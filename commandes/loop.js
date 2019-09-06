const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);
    if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');

    fetched.dispatcher.emit('loop');

}