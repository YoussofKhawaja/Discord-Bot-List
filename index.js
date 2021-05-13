const { Client, Collection, Util } = require("discord.js");
const { MessageEmbed, Discord } = require('discord.js');
const { token, default_prefix } = require("./botconfig.json");
const message = require("./events/guild/message");
const bot = new Client();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

     //bot id on ping reply that text don't forget to change to ur bot id
    if(message.content === "<@800671095647633450>" || message.content === "<@!800671095647633450>") {
        let sEmbed = new MessageEmbed()
        .setColor(0xffa500)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**My server's prefix is \`${default_prefix}\`**\n\nType \`${default_prefix}addbot [BOT'S PREFIX] [BOT'S ID]\` to add your bot on the bot verify queue!‎`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL(), false);
    return message.channel.send(sEmbed)
        }

    })

// bot token fom config
bot.login(token);