const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const pool = require('../database')
const helper = require('../lib/helpers')


passport.use('local.signin',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async (req,email,password,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE email = ?',[email])
    if(rows.length > 0)
    {
        const user = rows[0];
        const validPassword = await helper.matchPassword(password,user.password)

        if(validPassword)
        {
            done(null,user,req.flash('success','Welcome '+ user.email))
        }
        else{
            done(null,false,req.flash('message','Incorrect Password'))
        }
    }
    else{
        return done(null,false,req.flash('message','Este usuario no existe'))
    }
}))


passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req,username,password,done)=>{

    const {role} = req.body

    const newUser =
    {
        email:username,
        password,
        rol:role
    }
    newUser.password = await helper.encryptPassword(password)
    const result = await pool.query('INSERT INTO users set ?',[newUser])
    newUser.id = result.insertId
    return done(null,newUser)
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done) =>{
    const rows = await pool.query('SELECT * FROM users WHERE id= ?',[id])
    done(null,rows[0])
})
