const bcrypy = require('bcryptjs')

const helpers = {}

helpers.encryptPassword = async(password)=>{
    const salt = await bcrypy.genSalt(10)
    const hash = await bcrypy.hash(password,salt)
    return hash
}

helpers.matchPassword = async(password,savedPassword)=>{
    try{
        return await bcrypy.compare(password,savedPassword)
    }
    catch(e)
    {
        console.log(e)
    }
    

}


module.exports = helpers