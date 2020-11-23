

// Create a variable to hold the database connection
let db;

// Establish a connection to IndexedDB database called 'pizza-hunt', and set
// it to 'version 1'.
const request = indexedDB.open('pizza_hunt', 1);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Setup the event listeners.

// This event will emit if the database version changes (non-existent to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // Save a reference to the database 
    const db = event.target.result;
    // Create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_pizza', { autoIncrement: true });
  };


// On creation (for a new DB), or connecting to an existing DB, store the database object in our variable.  This 
// listener also handles our interactions with the DB.
request.onsuccess = function(event) {
    // When db is successfully created with its object store (from onUpgradeNeeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // Check if app is online, if yes run uploadPizza() function to send all local db data to api
    if (navigator.onLine) {
      // Send any data in 'indexDB' to the on-line Database once the connection is restored.
      uploadPizza();
    }
  };
  

  // If there is an error with DB interaction, inform the user. 
  request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Setup the functions to interact with the DB


  // This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // Open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_pizza'], 'readwrite');
  
    // Access the object store for `new_pizza`
    const pizzaObjectStore = transaction.objectStore('new_pizza');
  
    // Add a record to your store with add method
    pizzaObjectStore.add(record);
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Setup the function to transfer the data from indexDB to the on-line database when the Internet connection is restored.
function uploadPizza() {
    // Open a transaction to the local indexDB
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // Access the object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // Get all records from store and set to a variable
    const getAll = pizzaObjectStore.getAll();                // Note, 'getAll' is Asynchronous

    // Upon a successful .getAll() execution, run this function
    getAll.onsuccess = function () {
        // If there was data in indexedDb's store, send it to the API server
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                // Open one more transaction
                const transaction = db.transaction(['new_pizza'], 'readwrite');

                // Access the new_pizza object store
                const pizzaObjectStore = transaction.objectStore('new_pizza');

                // Clear all items in your store, don't want to submit again.
                pizzaObjectStore.clear();

                alert('All saved pizza has been submitted!');
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// The eventListener to listen for this application coming back on-line.
window.addEventListener( 'online', uploadPizza );
