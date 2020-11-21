

const { Pizza } = require('../models');

const pizzaController = {

    ///////////////////////////////////////////////////////////////////////////////////
    // Get all the pizzas.   This will be the call-back function for
    // the 'Get/api/pizzas' route.  The '.find' is similar to the
    // "Sequelize" '.findAll()' method.
    getAllPizza(req, res) {

        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    /////////////////////////////////////////////////////////////////////////////////////
    // Get only one pizza by id
    getPizzaById({ params }, res) {                     // destructure the params out of the 'req'

        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                // If no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    /////////////////////////////////////////////////////////////////////////////////////
    // Create a Pizza
    createPizza({ body }, res) {                        // destructure the body out of the 'req'

        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
    
    /////////////////////////////////////////////////////////////////////////////////////
    // Update a pizza by ID
    updatePizza({ params, body }, res) {                

        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })    // "new:true" indicates return new version
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
      },
          
    /////////////////////////////////////////////////////////////////////////////////////
    // Delete a pizza
    deletePizza({ params }, res) {                               // destructure the params out of the 'req'

        Pizza.findOneAndDelete({ _id: params.id })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
      }
  }

module.exports = pizzaController;