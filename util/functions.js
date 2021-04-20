const mongoose = require ('./mongoose');
const {Guild} = require ('../models/index');
module.exports = client => {
    //New Guild
    client.createGuild = async guild => {
        const merged = Object.assign(guild);
        const createGuild = await new Guild(merged);
        createGuild.save()
    };

    client.getGuild = async guild => {
        const data = await Guild.findOne({guildID: guild.id})
        if (data) return data;
    }

    client.getUser = async member => {
        const data = await client.getGuild(member.guild);
        const position = await data.users.map(e => e.id).indexOf(member.id);
        return data.users[position];
    }

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };

    client.createUserProfile = (member, guild) => {
        Guild.updateOne(
            {guildID: guild.id},
            {
                $push: {
                    users: {
                        id: member.id,
                        username: member.user.username,
                        race: "",
                        level: 1,
                        prestige: 0,
                        experience: 0,
                        rdc: 0,
                        daily: 0,
                        po: 200,
                        evolve: 0,
                        teams: "None",
                        attribut: [],
                        class: "",
                        stats: {},
                        statsMax: {},
                        inventory: [],
                        bank: [],
                        equipments: {
                            "Mh": "None",
                            "Oh": "None",
                            "armor": "None",
                            "broach": "None",
                            "rings": "None",
                            "earrings": "None",
                            "belt": "None"
                        },
                        Slime : 0,
                        Goblin : 0,
                        Wildboard : 0,
                        Cave_Spider : 0,
                        Wolf : 0,
                        Skeleton : 0,
                        Shadow : 0,
                        Ogre : 0,
                        Giant_Mantis : 0,
                        Orc : 0,
                        Phantomtooth : 0,
                        Vaporhag : 0,
                        Gloomfang : 0,
                        Taintscreamer : 0,
                        Cryptsoul : 0,
                        Mimic : 0,
                        Zombie : 0,
                        Becale : 0,
                        Sopurenne : 0,
                        Dark_timilo : 0,
                        King_Slime : 0,
                        Giant_Kobold_Lord : 0,
                        Moonlight_cat : 0,
                        Orc_Disaster : 0,
                        Elyon : 0,
                        Dracula : 0,
                        Bowser : 0,
                        Fake_Kami : 0,
                        Shogun : 0,
                        The_Gleam_eyes : 0,
                        Hellwraith : 0,
                        Vampmask : 0,
                        Dreadfang : 0,
                        Hellstep : 0,
                        Wispling : 0,
                        Kae : 0,
                        Chartbdis : 0,
                        Yuusha : 0,
                        Demon_Lord : 0,
                        Maho : 0,
                        Norico : 0,
                        Thor : 0,
                        Odin : 0,
                        Reaper : 0,
                        Rimuru : 0,
                        Skarab : 0,
                        Naminoe : 0,
                        Kami : 0
                    }
                }
            }
        ).then(d => console.log("Profil créer !"));
    };

    client.updateUserInfo = (member, options = {}) => {
        Guild.updateOne(
            {"users.id": member.id},
            {$set: options}
        ).then();
    };

    client.createMissingInfoOnUser = (member, missingInfo = {}) => {
        Guild.updateOne({"users.id": member.id}, {$set: missingInfo}).then();
};
}