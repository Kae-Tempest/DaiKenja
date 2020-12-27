const {MessageEmbed} = require("discord.js")

module.exports = (client, member) => {
    const embed = new MessageEmbed()
        .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
        .setColor("#FF0000")
        .setFooter("Un utilisateur a quitté !")
        .setTimestamp()

    client.channels.cache.get("769215379238027297").send(embed);
}