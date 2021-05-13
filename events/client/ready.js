const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../../botconfig.json')

//on bot ready
module.exports = async bot => {
    console.log("-------------------------");
    console.log("    I AM READY TO GO     ");
    console.log("-------------------------");

    setInterval(function() {
    //bot status
                bot.user.setActivity(`moderators`, { type: 'LISTENING'})
                setTimeout(async() => {
                    bot.user.setActivity(`${bot.users.cache.size} users`, { type: 'WATCHING'})
                }, 10000)
            }, 5000)
        }, 10000
