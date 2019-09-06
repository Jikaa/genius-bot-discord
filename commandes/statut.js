const Discord = require("discord.js");

exports.run = (client, msg, args, ops) => {

    if (msg.member.id !== ops.ownerID) return msg.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');
    if ((`${args}` !== 'dnd') && (`${args}` !== 'idle') && (`${args}` !== 'online') && (`${args}` !== 'invisible')) {
        msg.channel.send('Statut inconnu');
    } else { client.user.setStatus(`${args}`); }

}