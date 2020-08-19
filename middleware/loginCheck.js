const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    let { username } = req.session
    if (username) {
        next()
        return
    }
    res.json(
        new ErrorModel('未登陆！')
    )
}