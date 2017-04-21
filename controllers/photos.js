let express = require("express")

let routes = () => {
    let photosRouter = express.Router()
    photosRouter.route('/')
        .get((req, res) => {
            res.render("pages/photosList")
        })
    return photosRouter
}

module.exports = routes