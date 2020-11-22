
// Import the dependencies

const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// Route to add a comment to a pizza
// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);


// Route to delete a comment 
// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);





module.exports = router;