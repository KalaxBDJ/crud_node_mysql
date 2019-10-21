const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./routes/index')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const {database} = require('./keys')
const auth = require('./routes/authentication')
const passport = require('passport')

//Initializations
const app = express()
require('./lib/passport')

//MiddleWares
app.use(session({
    secret:'crudbddnode',
    resave:false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}))

app.use(flash())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())


//Global Variables
app.use((req,res,next)=>{

    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    next();
})


//Rest of Code
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use('/links',routes)
app.use('/',auth)



module.exports = app