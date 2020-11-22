
const router        = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes   = require('./pizza-routes');


// Add the prefix of '/comments' to the routes created in 'comment-routes.js'
router.use('/comments', commentRoutes);

// Add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

module.exports = router;