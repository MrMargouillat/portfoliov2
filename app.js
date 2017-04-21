// Requires
let express = require("express")
let bodyParser = require('body-parser')
let  cookieSession  = require('cookie-session')

let app = express()

let PORT = process.env.port || 8080

app.set('view engine', 'ejs')

// Middleware
app.use('/static', express.static('public'))
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(cookieSession({
    name:   'session',
    keys:  ["key"],
}))




app.use((req, res, next) => {
    // handeling user to be useable in ejs
    if (req.session.user) {
        res.locals.user = req.session.user
    }
    next()
})

app.use((req, res, next) => {
    // Error handeling system
    if (req.session.error) {
        res.locals.error = req.session.error
        req.session.error = null
    }

    next()
})

app.use((req, res, next) => {
    // success handeling system
    if (req.session.user) {
        res.locals.success = req.session.success
        req.session.success = null
    }
    next()
})

// Routes
let indexRouter = require("./controllers/index")()
app.use("/", indexRouter)

let photosRouter = require("./controllers/photos")()
app.use("/api/photos", photosRouter)


app.listen(PORT)