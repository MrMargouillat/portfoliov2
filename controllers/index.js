let express = require("express")

let routes = () => {
    let indexRouter = express.Router()
    indexRouter.route('/')
        .get((req, res) => {
            res.render("pages/index")
        })
    return indexRouter
}

module.exports = routes