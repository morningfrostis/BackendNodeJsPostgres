const routerUser = require('express').Router()
const { getUserById, toggleNasaToFavorite, getAll } = require('../controllers/controlerUser')

// Agregar favoritos a un usuario y controlar si existe dicho favorito en la DB
routerUser.post('/addToFavorites/:roverId', async (request, response) => {
    try {
        const { roverId } = request.params
        const { user, isAdded } = await toggleNasaToFavorite({
            userId: request.user.id,
            roverId
        })
        if (isAdded) {
            response.status(200).json('Favorites successfully added')
        } else {
            response.status(200).json('Favorite delete Ok')
        }
    } catch (error) {
        if (error.message === 'No exist this data in DB routes') {
            response.status(400).json(error.message)
        } else {
            console.log(error)
            response.status(500).json('No exist this data in DB routes 2')
        }
    }
})

// Obtener favoritos por cada usuario
routerUser.get('/favorites/:idNasa', async (request, response) => {
    try {
        const { idNasa } = request.params
        const user = await getUserById(idNasa)
        const favorites_ = user.nasaFavs
        response.status(200).json(favorites_)
    } catch (error) {
        response.status(500).json('Cant show favorites')
    }
})

routerUser.get('/prueba', async(req, res)=>{
    const users = await getAll()
    res.send(users);
})
module.exports = routerUser