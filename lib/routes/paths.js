const router = require('express').Router();
const register = require('../middlewares/auth/register');
const SignIn = require('../middlewares/auth/SignIn');
const products = require('../middlewares/products/products');
const users = require('../middlewares/users/user');
const paytm = require('../middlewares/payments/paytm/paytm');
const Paymenthandlers = require('../middlewares/payments/razorpay/checkout');

router.get('/', (req, res) => res.send('Welcome To EGM API'));

//Registeration Paths...
router.post('/signup', (req, res) => register.RegistrationHandler(req, res))
router.post('/signin', (req, res) => SignIn.SignInHandler(req, res))

// Products Paths...
router.get('/User-fetch-products', (req, res) => products.RenderAllProducts(req, res));
router.get('/find-product/:query', (req, res) => products.SearchProducts(req, res));

// user paths...
router.post('/user/add-to-cart', (req, res) => users.addToCart(req, res));
router.post('/user/remove-from-cart', (req, res) => users.removeItem(req, res));
router.post('/user/get-cart', (req, res) => users.fetchCart(req, res));

// Payments Paths...
router.post('/api/razorpay/create-order', (req, res) => Paymenthandlers.CreateOrder(req,res));

module.exports = router;