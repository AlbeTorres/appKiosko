const Pedido = require('../models/Pedido');
const {validationResult} = require('express-validator');



exports.crearPedido= async(req, res)=>{
     //revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()});
     }

     try {

        //crear trabajo
        const pedido = new Pedido(req.body);
        pedido.usuario = req.usuario.id;

        await pedido.save();
        res.status(200).json(pedido);
         
     } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
         
     }
    
}

//obtener todos los trabajos
exports.obtenerPedidos= async(req, res)=>{

    try {

         const pedidos = await Pedido.find();
         res.status(200).json({pedidos});

    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}
exports.modificarPedido= async(req, res)=>{

    try {

        //verificar que el trabajo existe
        const pedidoFind = await Pedido.findById(req.params.id);
        if(!pedidoFind){
            return res.status(404).json({msg:'No existe el pedido a modificar'});
        }

        //actualizar trabajo
        await Pedido.updateOne({_id:req.params.id},{$set: req.body})

        const resolve = await Pedido.findById(req.params.id);
        res.status(200).json(resolve);
         
    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}
exports.eliminarPedido= async(req, res)=>{

    try {

         //verificar que el trabajo existe
         const pedidoFind = await Pedido.findById(req.params.id);
        if(!pedidoFind){
            return res.status(404).json({msg:'No existe el pedido a modificar'});
        }

         //eliminar trabajo
         await Pedido.findOneAndRemove({_id:req.params.id});
         res.status(200).json({msg:'Pedido eliminado correctamente'});
         
    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}