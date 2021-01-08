/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import { MSGS } from './messages';
import * as sm from 'simplymongo';
import { encryptPassword, verifyPassword } from './passwort';
import chalk from 'chalk';
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const config = require("../config.json");
const hook = new Webhook(config.webhook);
const profilbild = config.profilbild;
const webhookname = config.webhookname;

const db = sm.getDatabase();

alt.onClient('auth:Try', handleAuthAttempt);
alt.on('auth:Done', debugDoneAuth);

async function handleAuthAttempt(player, username, password, email) {
    if (!player || !player.valid) {
        return;
    }

    if (!username || !password) {
        alt.emitClient(player, 'auth:Error', MSGS.UNDEFINED);
    }

    if (email) {
        handleRegistration(player, email, username, password);
        return;
    }

    handleLogin(player, username, password);
}
async function handleRegistration(player, email, username, password) {
    const emails = await db.fetchAllByField('email', email, 'accounts');
    if (emails.length >= 1) {
        alt.emitClient(player, 'auth:Error', MSGS.EXISTS);
        return;
    }

    const usernames = await db.fetchAllByField('username', username, 'accounts');
    if (usernames.length >= 1) {
        alt.emitClient(player, 'auth:Error', MSGS.EXISTS);
        return;
    }
    
    const document = {
        email,
        username,
        password: encryptPassword(password)
    };

    const dbData = await db.insertData(document, 'accounts', true);
    alt.emit('auth:Done', player, dbData._id.toString(), dbData.username, dbData.email);
}
async function handleLogin(player, username, password) {
    const accounts = await db.fetchAllByField('username', username, 'accounts');
    if (accounts.length <= 0) {
        alt.emitClient(player, 'auth:Error', MSGS.INCORRECT);
        return;
    }

    if (!verifyPassword(password, accounts[0].password)) {
        alt.emitClient(player, 'auth:Error', MSGS.INCORRECT);
        return;
    }

    if (config.webhookaktiv = true) {
        const embed = new MessageBuilder()
            embed.setTitle('Neuer Benutzer')
            embed.setAuthor(config.servername, profilbild)
            embed.setURL(config.websiteurl)
            embed.addField('Benutzername', username, true)
            embed.addField('E-Mail', email, true)
            embed.addField('Ingame ID', id, true)
            embed.setColor('#00b0f4')
            embed.setThumbnail(profilbild)
            embed.setFooter('Login System by TutoHacks', 'https://cdn.discordapp.com/avatars/595212497821368330/5f34a4702c5cdbe6418aa70e15eaa125.png?size=128')
            embed.setTimestamp();
        hook.setUsername(webhookname);
        hook.setAvatar(profilbild);
        hook.send(embed);
        alt.emit('auth:Done', player, accounts[0]._id.toString(), accounts[0].username, accounts[0].email);
        return;
    }

    alt.emit('auth:Done', player, accounts[0]._id.toString(), accounts[0].username, accounts[0].email);
}
function debugDoneAuth(player, id, username, email) {
    console.log(chalk.cyanBright(`Authentifiziert - ${username} | ${id}`));
}
