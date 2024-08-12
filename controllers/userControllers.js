const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const validationUser = [
  body('firstname').trim()
    .isAlpha().withMessage('O nome deve conter apenas letras alfabéticas.')
    .isLength({ min: 3, max: 255 }).withMessage('O nome deve ter entre 3 e 255 caracteres.'),

  body('lastname').trim()
    .isAlpha().withMessage('O sobrenome deve conter apenas letras alfabéticas.')
    .isLength({ min: 3, max: 255 }).withMessage('O sobrenome deve ter entre 3 e 255 caracteres.'),

  body('email').trim()
    .isEmail().withMessage('O e-mail deve ser válido e conter "@" e um domínio.')
    .isLength({ min: 12, max: 255 }).withMessage('O e-mail deve ter entre 12 e 255 caracteres.'),

  body('password').trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
    .withMessage('A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.')
    .isLength({ min: 10, max: 100 }).withMessage('A senha deve ter entre 10 e 100 caracteres para ser mais segura.')
];

exports.createUser = [validationUser, asyncHandler(async(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
  return res.status(400).render('signup', {
    errors: errors.array()
   });
  }
  const {firstname, lastname, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({
  firstname: firstname, 
  lastname: lastname, 
  email: email, 
  password: hashedPassword
})

req.login(user, error => {
  if(error) {next(error)}
  res.redirect('/')
 })
})];

exports.renderSignupUser = asyncHandler(async(req, res) => {
  res.render('signup');
})

passport.use(new LocalStrategy({usernameField: 'email'}, 
  async (email, password, done) => {
  try{
  const user = await User.findOne({where: {email: email}});
  if(!user) {return done(null, false, {message: 'O email do usuário não está registrado.'})};
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    return done(null, false, {message: 'Senha incorreta!'})
  }

  return done(null, user);
} catch(error) {
  return done(error)
}
}))

passport.serializeUser((user, done)=> {
 return done(null, user.id)
});

passport.deserializeUser(async(id, done) => {
  try{
  const user = await User.findByPk(id);
  
 return done(null, user)
}catch(error) {
  return done(error)
}

});

exports.userLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

exports.userRenderLogin = asyncHandler(async(req, res) => {
  res.render('login');
});
