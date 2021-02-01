const fs = require('fs');

exports.run = (client, msg, args, ops) => {

    let owner = 0;
    for (var i=0; i<ops.ownersID.length; i++) {
        if (msg.member.id !== ops.ownersID[i]) owner++;
    }
    if (owner === ops.ownersID.length) return msg.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');

    client.destroy();

}