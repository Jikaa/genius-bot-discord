const Discord = require("discord.js");
var giphy = require('giphy-api')({
    apiKey: "EnKvndMTb8RrdFrbfJIZfH1SEKKmSoxZ"
});

exports.run = (client, msg, args, ops) => {

    if (!args[0]) return msg.channel.send("Utilisation de la commande gif ```gif <recherche mots clés Giphy.com>```");

    giphy.search({
        q: `${args}`,
        limit: 20,
        fmt: "json"
    }, function (err, res) {
        if (err) throw err;
        if (res.data[0]) {
            let rnd = Math.floor(Math.random() * Math.floor(res.data.length-1));
            msg.channel.send(res.data[rnd].images.original.url);
        } else { msg.channel.send('Aucun gif trouvé sur Giphy.'); }
    });
    
}