const db = require('../models')
const User = db.User;
const Data = db.Data

const getUserById = async (id) => {
    const user = await User.findByPk(id)
    delete user.password;
    return user
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where:
            { email: email }
    })
    return user
}

const toggleNasaToFavorite = async ({ id, idNasa }) => {
    let user = await User.findByPk(id);
    let currentFavList = user.get('nasaFavs');
    let newFavsList = currentFavList.filter(()=>true).map((id_)=>Number(id_));

    const existed = currentFavList.includes(Number(idNasa));

    let isAdded = false;
    if (existed) {
        newFavsList = currentFavList.filter(item => Number(item) !== Number(idNasa));
    } else {
        const fav = await Data.findByPk(idNasa);
        if (!fav) {
            throw new Error('No exist this data in DB');
        } else {
            newFavsList.push(idNasa);
            isAdded = true;
        }
    }

    await User.update({ nasaFavs: newFavsList }, { where: { id: id } });
    user = await User.findByPk(id, { attributes: { exclude: ['password', 'salt'] } });

    return { user: user, isAdded: isAdded };
}

module.exports = {
    getUserById,
    getUserByEmail,
    toggleNasaToFavorite
}