const {verify,userData, login} = require('../controllers/verify.controller')
const router = require('express').Router()
router.get('/:token',verify)
router.post('/signup',userData)
router.post("/login",login)
module.exports = router