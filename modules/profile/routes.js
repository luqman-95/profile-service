const express = require('express');
const api = express.Router();

const handler = require('./handlers');

api.get('', async (req, res, next) => {
    try {
        const data = await handler.getProfile(req.body);
        return res.withStatus.ok(
            `Success Get Data`,
            data
        );
    } catch (error) {
        next(error);
    };
});

api.post('/post', async (req, res, next) => {
    try {
        const data = await handler.postProfile(req.body);
        return res.withStatus.created(
            `Success Get Data`,
            data
        );
    } catch (error) {
        next(error);
    };
});

api.put('/update', async (req, res, next) => {
    try {
        const data = await handler.updateProfile(req.body);
        return res.withStatus.accepted(
            `Success Update Data`,
            data
        );
    } catch (error) {
        next(error);
    };
});

api.put('/delete', async (req, res, next) => {
    try {
        const data = await handler.deleteProfile(req.body);
        return res.withStatus.accepted(
            `Success Delete Data`,
            data
        );
    } catch (error) {
        next(error);
    };
});

module.exports = {
    api
};