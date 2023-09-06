const UserController = require('../controllers/userController')
const middleware = require('../middleware/validator')
const schemas = require('../validation/userValidation')
const Router = require('express').Router
const controller = new UserController()
const router = Router()

router.post('/signup', middleware(schemas.Create, 'post'), controller.create)
router.post('/login', middleware(schemas.Login, 'post'), controller.login)
router.get('/findall', controller.findAll)
router.get('/search', controller.search)
router.get('/findone/:id', controller.findOne)
router.patch('/update/:id', controller.update)



module.exports = router