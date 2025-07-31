const express = require('express');
const chalk = require('chalk');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/ui', express.static(path.join(__dirname, 'ui')));

// Global Helpers
global.getBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

global.fetchJson = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'GET',
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0'
            },
            ...options
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

// Settings
const settings = {
    creatorName: "FikXzMods",
    whatsappLink: "https://wa.me/628973965618",
    instagramLink: "https://www.instagram.com/fikxzmodzz?igsh=MWU0d2Y2dWduMWY2bg=="
};

// Global JSON Response Wrapper
app.use((req, res, next) => {
    global.totalreq = global.totalreq || 0;
    global.totalreq += 1;

    const originalJson = res.json;
    res.json = function (data) {
        if (
            typeof data === 'object' &&
            req.path !== '/endpoints' &&
            req.path !== '/set'
        ) {
            return originalJson.call(this, {
                creator: settings.creatorName || "Created Using FikXzMods",
                ...data
            });
        }
        return originalJson.call(this, data);
    };

    next();
});

// Routes
app.get('/set', (req, res) => res.json(settings));

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.get('/gamejkt.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'gamejkt.html'));
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(chalk.bgGreen.black(` 🚀 Server is running on port ${PORT} `));
});

module.exports = app;
