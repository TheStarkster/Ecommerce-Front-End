const router = require('express').Router();
const register = require('../middlewares/auth/register');
const SignIn = require('../middlewares/auth/SignIn');
const products = require('../middlewares/products/products');
const users = require('../middlewares/users/user');
const paytm = require('../middlewares/payments/paytm/paytm');
const Paymenthandlers = require('../middlewares/payments/razorpay/checkout');
const Promo = require('../middlewares/applypromo')

router.get('/', (req, res) => res.send('Welcome To EGM API'));

//Registeration Paths...
router.post('/signup', (req, res) => register.RegistrationHandler(req, res))
router.post('/signin', (req, res) => SignIn.SignInHandler(req, res))

// Products Paths...
router.get('/User-fetch-products', (req, res) => products.RenderAllProducts(req, res))
router.post('/similar-product', (req, res) => products.SimilarProduct(req, res))
router.post('/get-product', (req, res) => products.GetProduct(req, res))
router.post('/update-wishlist', (req, res) => users.UpdateWishlist(req, res))
// router.post('/remove-from-wishlist', (req, res) => products.RemoveWishlist(req, res))
router.get('/find-product/:query', (req, res) => products.SearchProducts(req, res))

// user paths...
router.post('/user/add-to-cart', (req, res) => users.addToCart(req, res)); // Latest Array...
router.post('/user/remove-from-cart', (req, res) => users.removeItem(req, res));
router.post('/user/get-cart', (req, res) => users.fetchCart(req, res));

//User Paths..
router.post('/user/save-address', (req, res) => users.SaveAddress(req, res));
router.post('/user/update-address', (req, res) => users.UpdateAddress(req, res));
router.post('/user/update', (req, res) => users.UpdateUser(req, res));
router.post('/user/update-password', (req, res) => users.UpdatePassword(req, res));

router.post('/user/check-promo', (req, res) => Promo.CheckPromo(req, res));

// Payments Paths...
router.post('/api/razorpay/create-order', (req, res) => Paymenthandlers.CreateOrder(req,res));
router.post('/api/razorpay/check-payment', (req, res) => Paymenthandlers.CheckPayment(req,res));

module.exports = router;