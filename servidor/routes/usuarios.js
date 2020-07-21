const express = require('express');
const bcrypt = require('bcrypt');
const _ = require ('underscore');
const cors = require('cors');



const router = express.Router();



const Usuario = require('../models/usuario');
const { findByIdAndUpdate } = require('../models/usuario');

// aca con cors comparto a todos los usurarips pero solo esto 
router.get('/usuarios',cors(),(req,res)=>{
    // let desde = req.query.desde || 0
    // desde = Number(desde)
    // let limite = req.query.limite || 5
    // limite = Number(limite) 

    Usuario.find( {estado:true}, 'nombre email role estado img')
    // .skip(desde)
    // .limit(limite)


    // aca pongo peticion ,o me trae un err si hay algo mal o si esta bien q me traiga a los usuarios en formato JSOM
    .exec((err, usuarios)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        // el .json hace q me traiga en formato json
        res.json({
            ok:true,
            usuarios
        })
    })
})


router.get('/usuariosborrados',(req,res)=>{
    // let desde = req.query.desde || 0
    // desde = Number(desde)
    // let limite = req.query.limite || 5
    // limite = Number(limite) 

    Usuario.find( {estado:false}, 'nombre email role estado img')
    // .skip(desde)
    // .limit(limite)


    // aca pongo peticion ,o me trae un err si hay algo mal o si esta bien q me traiga a los usuarios en formato JSOM
    .exec((err, usuarios)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        // el .json hace q me traiga en formato json
        res.json({
            ok:true,
            usuarios
        })
    })
})



router.get('/usuario/:id',cors(),(req,res)=>{

    console.log('traer un solo usuario');

    let id = req.params.id

    Usuario.findById(id,(err,usuario1)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }if(usuario1){
            res.json({
                ok:true,
                usuario1
            })
        }
    })


})

router.post('/usuario',(req,res)=>{
    console.log('crear un usuario')
    let body = req.body;

    let usuario = new Usuario ({
        nombre:body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        })
    })
})


router.put('/usuario/:id',(req,res)=>{
    console.log('actualiza usuarios')

    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email', 'role', 'estado'])

    Usuario.findByIdAndUpdate(id, body,(err,usuario2)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!usuario2){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario:usuario2
        })
    })
})


router.delete('/usuario/:id',(req,res)=>{

    console.log('marca usuario comom borrado')

    let id = req.params.id;


    // Usuario.findByIdAndRemove(id, (err , usuarioBorrado) =>{
    //     // esto borra el usuario pero nosotros no queremos hacer eso queremos cambiarle el estado para q qude apagado digamos pero por si quiere reactivar su cuenta podria haccerlo

    // })

    
    let cambiarEstado ={
        estado : false
    }


    Usuario.findByIdAndUpdate(id , cambiarEstado, (err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok:true,
            usuario: usuarioBorrado
        })
    })


})



module.exports = router;