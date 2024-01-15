//Creacion de constantes y exportando librerias(De esa manero lo entiendo)
//Mi primera pagina web 
// const(Nombre de la constante) = require(paquete)(Libreria);
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');


const { database } = require('./keys');
//Inicializaciones
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000); //Defenicio del purto de conexion, si existe toma tal y si no existe toma otro
app.set('views', path.join(__dirname, 'views'));//Para jalar los datos de la carpeta de Layouts que esta dentro de views
app.engine('.hbs', exphbs.engine({ //EN caso de no reconosca la funcion, agregar un engine
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // la direcion de la carpeta Layouts
    partiaslDir: path.join(app.get('views'), 'partials'), // la dirrecion de la carpeta Partials
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares (Para las peticiones de los usuarios o clientes)
app.use(session({
    secret: 'guardarseccion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev')); //Para que morgan nos pueda mostrar las peticiones
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //Linea que nos ayudara para realizar cambios en el futuro
app.use(passport.initialize());
app.use(passport.session());


//Globbl variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.success = req.flash('message');
    app.locals.user = req.user;
    next();
})


//Routes
app.use(require('./routes')) //A la aplicacion le damos la ruta a buscar para lo que queremos mostar
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))


//Public 
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server 
app.listen(app.get('port'), () => { //Comineza a utilizar el puerto asignado qye le dimos en Settings
    console.log('Server on port', app.get('port')); //Nos mostrata un mensaje ne consola que el servidor esta en funcionamiento
});