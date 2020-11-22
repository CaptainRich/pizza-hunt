
// Import the  models needed
const { Comment, Pizza } = require('../models');

// Create the commentController object, with its methods

const commentController = {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Add a comment to a pizza
    addComment({ params, body }, res) {

        console.log(body);
        Comment.create(body)
          .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
              { _id: params.pizzaId },
              { $push: { comments: _id } },  // add the comment's ID to the pizza to update
              { new: true }                  // we get back the updated pizza document (with the new comment included)
            );
          })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    },
  
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // remove comment
    removeComment({ params }, res) {

        Comment.findOneAndDelete({ _id: params.commentId })  // first delete the comment and return its data
        .then(deletedComment => {                          
          if (!deletedComment) {
            return res.status(404).json({ message: 'No comment with this id!' });
          }
          return Pizza.findOneAndUpdate(
            { _id: params.pizzaId },
            { $pull: { comments: params.commentId } },     // now delete the comment from the pizza
            { new: true }                                  // return the updated pizza information
          );
        })
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
  };
  
  module.exports = commentController;