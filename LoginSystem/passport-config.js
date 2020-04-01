const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs');

async function initialize(passport,  getUserByEmail) { 

    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if(await bcryptjs.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null. false, {message: 'Password incorrect'});
            }
        }catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }), 
    authenticateUser)
    passport.serializeUser((user, done) => { });
    passport.deserializeUser((id, done) => { });
}

module.exports = initialize;