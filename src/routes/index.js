const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{ //Arreglo de una ruta para coloxar Hola mundo :v 
    res.render('index');
});

module.exports = router;