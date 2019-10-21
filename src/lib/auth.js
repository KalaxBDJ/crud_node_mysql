module.exports = {
    isLoggedIn(req,res,next){
         if(req.isAuthenticated())
         {
            return next();
         }
         return res.redirect('/signin')
    }
    ,
    isAllowed(req,res,next){
        if(req.user.rol === 'admin')
        {
            return next()
        }
        else 
        {
            req.flash('message','No Tiene permitida esta funcion')
            res.redirect('/profile')
        }
    }
}