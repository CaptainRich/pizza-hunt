
// Import the dependencies

const router = require('express').Router();
const { addComment, removeComment,
        addReply,   removeReply   } = require('../../controllers/comment-controller');

// Route to add a comment to a pizza
// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);


// Route to delete a comment from a pizza
// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

// Route to add a reply to a comment
router
  .route('/:pizzaId/:commentId')
  .put(addReply);
  //.delete(removeComment);


// Route to delete a reply from a comment
router
  .route('/:pizzaId/:commentId:/replyId')
  .delete(removeReply);



module.exports = router;