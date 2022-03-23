// IMPORT MODULES
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// LOAD ROUTES
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

// LOAD CONFIGS
dotenv.config({ path: './config/.env' })
const connectDB = require('./config/db')
const { ensureAuth, checkUser, isAuth, } = require('./middleware/authGuard')

// CREATE EXPRESS APP
const app = express()
const PORT = process.env.PORT || 80
// const HOST = process.env.HOST || '0.0.0.0'

// GLOBAL VARIABLES
app.locals.appNames = {
  title: 'Puri Mas Lele',
  version: '0.1.7',
  icon: {
    '96': '/icons/icon-96x96.png'
  }
}

// USE BODY PARSER
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }))

// LOGGER (if on development mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// SET EJS VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// SET STATIC FOLDER
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use('/bulmaEX', express.static(__dirname + '/node_modules/bulma-extensions'));
app.use('/bulmaCR', express.static(__dirname + '/node_modules/@creativebulma'));
app.use('/icons', express.static(__dirname + '/node_modules/material-icons/iconfont'));

// ROUTES
app.get('*', checkUser)
app.get('/',isAuth, (req, res) => {
  res.render('public/index')
})
app.use(authRoutes)
app.use('/admin', [ensureAuth], adminRoutes)
app.use('/public', require('./routes/public'))

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.status(404).render('common/4xx', {
    navTitle: { a: '404', b: 'Halaman tidak ditemukan' },
  })
});

// TRY CONNECT TO DB THEN START SERVER
try {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port : ${PORT}`)
    })
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}