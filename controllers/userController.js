const {userRef} = require('../config/firebaseConfig');
const {readDataFromDB, writeUserDataToDB, getDataBasedOnId, updateDataInDB, deleteDataFromDb} = require('../utils/utilityFunction');

// Function to fetch Users from DB. Uses utility function to read data from DB.
async function getUsers(req,res) {
    try {
        const users = await readDataFromDB(userRef);
        res.status(200).json({
            success: true,
            message: 'Users retreived from DB successfully.',
            data: users
        });
    } catch(error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            error: `Error reading users from DB: ${error}`
        })  
    }
}

// Function to create new users in DB. Uses utility function to write data to DB.
async function createUsers(req, res) {
    // Destructuring req body to extract data.
    const {
        name, 
        username, 
        email, 
        address: {
            street, 
            suite, 
            city, 
            zipcode
        }
    } = req.body;

    // Check if any values are missing.
    if(!name || !username || !email || !street || !suite || !city || !zipcode) {
        return res.status(400).json({
            success: false,
            error: 'All fields (name, username, email, address{street, suite, city, zipcode}) are required.'
        })
    }

    // Creating new user object with given values.
    const newUser = {
        name,
        username,
        email,
        address : {
            street,
            suite,
            city,
            zipcode
        }
    }

    // Writing data to DB and creating new user in DB.
    try {
        const dataToDb = await writeUserDataToDB(userRef, newUser);
        if(!dataToDb) {
            return res.status(500).json({
                success: false,
                error: 'Writing user to DB failed.'
            }) 
        } else {
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: newUser
            })
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Error writing user to DB: ${error}`
        })
    }    
}

// Function to update users in DB, based on given Id. Uses utility functions to fetch record based on Id and update record.
async function updateUsers(req,res) {
    const userId = req.params.id;
    // console.log("User id from PUT: ",userId);
    let user = {};

    // Destructuring req body to extract existing values.
    const {
        name, 
        username, 
        email, 
        address = {},
    } = req.body;
    const {street, suite, city, zipcode} = address;
    // console.log("Data from PUT request", uuid, name, username, email, street, suite, city, zipcode);

    // Fetch record based on given Id
    try {
        user = await getDataBasedOnId(userRef, userId);
        // console.log(user);
    } catch (error) {
        // console.log(`Error in retreving user with given Id: ${error}`);
        res.status(500).json({
            success: false,
            message: `Error updating user with given Id: ${error}`
        })
    }

    // Check for if user exists with given Id.
    if(!user) {
        return res.status(404).json({
            success: false,
            error: 'No user found with the given id'
        })
    }

    // Check for if atleast one value is given for updation.
    if(!name && !username && !email && !street && !suite && !city && !zipcode) {
        return res.status(400).json({
            success: false,
            error: 'Atleast one value must be provided for updation.'
        })
    }

    // Rewriting user object values with new values, if they exist, else retaining existing values.
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    if(user.address !== undefined) {
        user.address.street = street || user.address.street;
        user.address.suite = suite || user.address.suite;
        user.address.city = city || user.address.city;
        user.address.zipcode = zipcode || user.address.zipcode;
    }
    
    // Writing updated user object back to DB with corresponding Id reference.
    try {
        const dataToDb = await updateDataInDB(userRef, userId, user);
        if(!dataToDb) {
            return res.status(500).json({
                success: false,
                error: 'User update to db failed.'
            }) 
        } else {
            res.status(200).json({
                success: true,
                message: 'User updated',
                data: user
            })
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Error updating user in DB: ${error}`
        })
    }   
}

// Function to delete users in DB, based on given Id. Uses utility functions to fetch record based on Id and delete record.
async function deleteUsers(req,res) {
    // Extracting Id from request.
    const userId = req.params.id;
    let user = {};

    // Fetch record based on given Id
    try {
        user = await getDataBasedOnId(userRef, userId);
        console.log(user);
    } catch (error) {
        // console.log(`Error in retreving user with given Id: ${error}`);
        res.status(500).json({
            success: false,
            message: `Error in retrieving user with given Id: ${error}`
        })
    }   
    
    // Check for if user exists with given Id.
    if(!user) {
        return res.status(404).json({
            success: false,
            error: 'No user found with the given id'
        })
    }

    // Deleting user object at the Id reference provided in request.
    try {
        const successfulDeletion = await deleteDataFromDb(userRef, userId);
        if (successfulDeletion) {
            // console.log("User successfully deleted");
            res.status(200).json({
                success: true,
                message: `User with id: ${userId} deleted`
            }
        )
        } else {
            // console.log("User deletion failed.")
            res.status(500).json({
                success: false,
                message: 'Falied to delete user'
            })
        }
    } catch (error) {
        // console.log(`Error in deleting user: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Falied to delete user'
        })
    }
}

module.exports =  {getUsers, createUsers, updateUsers, deleteUsers};