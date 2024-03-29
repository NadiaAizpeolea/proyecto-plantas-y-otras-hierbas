var express = require('express');
var router = express.Router();
var usuariosModels = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
  layout: 'admin/layout'
});
});

router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.render('admin/login',{
    layout:'admin/layout'
  });
});

router.post('/',async(req,res,next)=>{
  try{
    var usuario = req.body.usuario;
    var password = req.body.password;

    var login = await usuariosModels.getUserbyNameAndPassword(usuario, password);

    if (login!=undefined){

      req.session.id_usuario = login.id;
      req.session.nombre = login.usuario;

      res.redirect('/admin/novedades');
    } 
    else{
      res.render('admin/login',{
        layout:'admin/layout',
        error: true
      })
    }
  }
  catch (error){
    console.log(error);
  }
});

module.exports = router;
