const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./routes/index')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const {database} = require('./keys')

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


//Global Variables
app.use((req,res,next)=>{

    app.locals.success = req.flash('success')
    next()
})


//Rest of Code
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use('/links',routes)




module.exports = app