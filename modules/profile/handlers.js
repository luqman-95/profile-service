const { get } = require('../../app');
const repository = require('./repository');
const transformer = require('./transformers');

const getProfile = (payload) => new Promise(async (resolve, reject) => {
    try {
        const { username } = payload;
        const getData = await repository.findBy({username});
        if ((!getData) || (getData.deleted == true)) {
            return reject({
                statusCode: 204,
                message: 'Data not found',
            });
        };

        const data = await transformer.profilePage(getData);
        resolve(data);
    } catch (error) {
        reject(error);
    };
});

const postProfile = (payload) => new Promise(async (resolve, reject) => {
    try {
        const { username } = payload;
        const findData = await repository.findBy({username});
        if (findData) {
            return reject({
                statusCode: 200,
                message: 'Username already used',
            });
        }

        const postData = await repository.create(Object.assign(
            {},
            payload
        ));
        const data = await transformer.profileData(postData);
        resolve(data);
    } catch (error) {
        reject(error);
    };
});

const updateProfile = (payload) => new Promise(async (resolve, reject) => {
    try {
        const { username } = payload;
        const findData = await repository.findBy({username});
        if (!findData) {
            return reject({
                statusCode: 204,
                message: 'Username not found',
            });
        }

        await repository.upsert({username}, payload);
        resolve(payload);
    } catch (error) {
        reject(error);
    };
});

const deleteProfile = (payload) => new Promise(async (resolve, reject) => {
    try {
        const { username } = payload;
        const findData = await repository.findBy({username});
        if (!findData) {
            return reject({
                statusCode: 204,
                message: 'Username not found',
            });
        }

        findData.deleted = true;
        await repository.upsert({username}, findData);
        const data = await transformer.profileData(findData);
        resolve(data);
    } catch (error) {
        reject(error);
    };
});

module.exports = {
    getProfile,
    postProfile,
    updateProfile,
    deleteProfile
};