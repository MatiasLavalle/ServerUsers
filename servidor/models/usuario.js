const mongoose = require('mongoose');

const rolesValidos={
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message:'{VALUE} NO es un Rol Valido'
}

let Schema = mongoose.Schema;

let usuarioSchrema = new Schema({
    nombre:{
        type:String,
        require: [true,'El nombre es requerido']
    },
    email:{
        type:String,
        require: [true,'El email es requerido'],
        unique: [true,'El email debe ser Unico']
    },
    password:{
        type:String,
        require: [true,'La password es requerida']
    },
    img:{
        type:String,
        require: false
    },
    role: {
        type:String,
        default:'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type:Boolean,
        default:true
    }
})


// aca hicimos q cuando hago la peticion get en usuarios NO me traiga la passs. y aparte q me ponga todo en formato jSON
usuarioSchrema.method.toJSON = function(){
    let userObject = Object.assign({},this)
    delete userObject.password
    return userObject
}






module.exports = mongoose.model('Usuario', usuarioSchrema)