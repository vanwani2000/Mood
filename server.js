// NPM PACKAGES
require('dotenv').config();
const   express         = require('express'),
        path            = require('path'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        ejs             = require('ejs'),
        favicon         = require('serve-favicon'),
        app             = express(),
        User            = require('./models/user'),
        Log             = require('./models/log');

// ROUTES
const miscRoutes        = require('./routes/misc'),
      newentryRoutes    = require('./routes/newentry'),
      userRoutes        = require('./routes/user');

// MONGODB
mongoose.connect('mongodb+srv://raja-mental-health:speakyourself@cluster0.h046w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// EXPRESS SETUP
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.ico')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS SETUP
app.set('view engine', 'ejs');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'yash',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ============================
// SERER
// ============================
app.use(userRoutes);
app.use(miscRoutes);
app.use(newentryRoutes);

// server logic
app.listen(process.env.PORT || 3000, function(){
    console.log('Server is listening on PORT ' + process.env.PORT || 3000 + '.');
});