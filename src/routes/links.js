const express = require('express');
const router = express.Router();


const pool = require('../database');//donde llamamos a nuetra base de datos
const {isLoggedIn} =require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{//para que la ruta con /ad, nos renderece la links/add
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res ) => { //dericcion donde nos mostrara la ruta para agregar un link 
    const{ title, url, description } = req.body; // lo que buscamos que realacione en el body
    const newLink = { 
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink], );//linea de codigo donde, lo estamos agregando ala base de datos
    req.flash('success', 'link saved successfully');
    res.redirect('/links'); //para que denderice una ves terminado 
});

router.get('/',isLoggedIn, async(req,res) =>{ //ruta para poder mostrar el contenido de la base de datos en la pagina
    const links = await pool.query('SELECT * FROM links WHERE user_id =?', [req.user.id]);
    res.render('links/list', {links});
});

router.get('/delete/:id',isLoggedIn ,async (req,res) =>{//eliminar algun elemento de la lista 
    const{id} = req.params;
    await pool.query('DELETE FROM  links WHERE ID = ?', [id]);
    req.flash('success','links Removed successfully');
    res.redirect('/links');
});

router.get('/edit/:id',isLoggedIn, async(req, res) => {//la edicion de los linkis que estan registrados 
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
   
    res.render('links/edit',{link: links[0]});
});

router.post('/edit/:id',isLoggedIn, async( req, res)  => { //actualizacion de la lista en la base de datos
    const {id} = req.params;
    const {title,description,url} = req.body;
    const newLink ={
        title,
        description,
        url
    };
   
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success','link updated successfully');
    res.redirect('/links');

});

module.exports = router;