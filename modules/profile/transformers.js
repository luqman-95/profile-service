const profilePage = (data) => {
    const result = {
        nama: data.nama,
        nomorHp: data.nomorHp,
    };
    return result;
};

const profileData = (data) => {
    const result = {
        username: data.username,
        nama: data.nama,
        nomorHp: data.nomorHp,
    };
    return result;
};

module.exports = {
    profilePage,
    profileData
};