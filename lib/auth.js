import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) { done(e); }
});

passport.use(new LocalStrategy(async (mail, password, done) => {
  try {
    const user = await User.findOne({ mail });
    if (user) {
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) done(null, user);
      else done(null, false);
    } else {
      done(null, false);
    }
  } catch (e) { done(e); }
}));
