# alt:V - Login System für AltV

[❤️ Spende mir für meine Arbeite](https://github.com/sponsors/TutoHacks/)

⭐ Dieses Script ist easy to use und aktiv in entwicklung!

# Was brauche ich?

**Bevor du mich kontaktierst stelle sicher das du NoeJS 13+ hast. Da ich schon so oft gefragt wurde.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   Einen existierenden Server
-   [MongoDB] eine exestierende MongoDB Datenbank

In dem Ordner wo die `.exe` oder die `alt-server` Datein sind. Musst du folgende commands ausführen.

```
npm install axios
npm install cors
npm install discord.js
npm install dotenv
npm install download
npm install express
npm install sjcl
```

Danach musst du in deine `server.cfg` folgenden Name hinzufügen. Es muss der gleiche sein!

`tim_login`

Dann kannst du dieses Script mit folgenden Commands einfügen.

```
cd resources
git clone https://github.com/TutoHacks/tim_login
```

# Konfiguration

Editiere die Datei mit notepad++ oder einem anderem Programm.

Und füge deine Informationen ein.

```json
{
    "db_url": "mongodb://localhost:27017",
    "db_database": "altv",
    "db_collections": ["accounts"],
    "db_username": null,
    "db_password": null,
    "webhookaktiv": true,
    "webhook": "DEIN WEBHOOK",
    "profilbild": "DAS PROFILBILD VON DEINEM WEBHOOK",
    "webhookname": "BENUTZER NAME DEINES WEBHOOKS",
    "websiteurl": "SERVER WEBSITE URL",
    "servername": "SERVERNAME"
}
```
