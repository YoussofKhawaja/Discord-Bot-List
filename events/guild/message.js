const { MessageEmbed } = require('discord.js')
const { default_prefix } = require('../../botconfig.json')

module.exports = async (bot, message) => {
//define if message from bot or in dm
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
//here prefix
    let args = message.content.slice(default_prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.toLowerCase().startsWith(default_prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}