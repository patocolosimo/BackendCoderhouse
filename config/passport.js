
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password' 
}, async (email, password, done) => {
    try {
        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email: email });

        
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        
        const isMatch = await user.comparePassword(password);

        
        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});
