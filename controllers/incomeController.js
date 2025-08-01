const {incomeRef} = require('../config/firebaseConfig');
const {readDataFromDB, writeIncomeDataToDB, getDataBasedOnId, updateDataInDB, deleteDataFromDb} = require('../utils/utilityFunction');

// Function to fetch Income from DB. Uses utility function to read data from DB.
async function getIncome(req,res) {
    try {
        const income = await readDataFromDB(incomeRef);
        res.status(200).json({
            success: true,
            message: "Income retrieved from DB",
            data: income
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error reading income from DB: ${error}`
        })  
    }
}

// Function to create new income in DB. Uses utility function to write data to DB.
async function createIncome(req,res) {
    // Destructuring req body to extract data.
    const {
        wages, 
        secondaryIncome, 
        interest, 
        supportPayment,
        others
    } = req.body;

    // Check if any values are missing.
    if(!wages || !secondaryIncome || !interest || !supportPayment || !others) {
        return res.status(400).json({
            success: false,
            error: 'All fields (wages, seconday income, interest, support payment, others) are required.'
        })
    }

    // Creating new income object with given values.
    const newIncome = {
        wages,
        secondaryIncome,
        interest,
        supportPayment,
        others
    }

    // Writing data to DB and creating new income in DB.
    try {
        const dataToDb = await writeIncomeDataToDB(incomeRef, newIncome);
        if(!dataToDb) {
            return res.status(500).json({
                success: false,
                error: 'Write income to db failed.'
            }) 
        } else {
            res.status(201).json({
                success: true,
                message: 'Income created',
                data: newIncome
            })
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Error writing income to DB: ${error}`
        })
    }    
}

// Function to update income records in DB, based on given Id. Uses utility functions to fetch record based on Id and update record.
async function updateIncome(req, res) {
    const incomeId = req.params.id;
    console.log("Income id from PUT: ",incomeId);
    let income = {};

    // Destructuring req body to extract existing values.
    const {
        wages,
        secondaryIncome,
        interest,
        supportPayment,
        others
    } = req.body;
    // console.log("Data from PUT request", wages, secondaryIncome, interest, supportPayment, others);

    // Fetch record based on given Id
    try {
        income = await getDataBasedOnId(incomeRef, incomeId);
        console.log(income);
    } catch (error) {
        // console.log(`Error in retreving income with given Id: ${error}`);
        res.status(500).json({
            success: false, 
            error: `Error retreiving income with given Id from DB: ${error}`
        })
    }

    // Check for if income exists with given Id.
    if(!income) {
        return res.status(404).json({
            success: false,
            error: 'No income found with the given id'
        })
    }

    // Check for if atleast one value is given for updation.
    if(!wages && !secondaryIncome && !interest && !supportPayment && !others) {
        return res.status(400).json({
            success: false,
            error: 'Atleast one field must be provided for updation.'
        })
    }

    // Rewriting income object values with new values, if they exist, else retaining existing values.
    income.wages = wages || income.wages;
    income.secondaryIncome = secondaryIncome || income.secondaryIncome;
    income.interest = interest || income.interest;
    income.supportPayment = supportPayment || income.supportPayment;
    income.others = others || income.others;
    
    // Writing updated income object back to DB with corresponding Id reference.
    try {
        const dataToDb = await updateDataInDB(incomeRef, incomeId, income);
        if(!dataToDb) {
            return res.status(500).json({
                success: false,
                error: 'Update to db failed.'
            }) 
        } else {
            res.status(200).json({
                success: true,
                message: 'Income updated',
                data: income
            })
        }
    } catch(error) {
        res.status(400).json({
            message: `Error writing income to DB: ${error}`
        })
    }   
}

// Function to delete income in DB, based on given Id. Uses utility functions to fetch record based on Id and delete record.
async function deleteIncome(req,res) {
    // Extracting Id from request.
    const incomeId = req.params.id;
    let income = {};

     // Fetch record based on given Id
    try {
        income = await getDataBasedOnId(incomeRef, incomeId);
        console.log(income);
    } catch (error) {
        // console.log(`Error in retreving income with given Id: ${error}`);
        res.status(500).json({
            success: false,
            error: `Error fetching income with the given Id`
        })
    }    


    // Check for if income exists with given Id.
    if(!income) {
        return res.status(404).json({
            success: false,
            error: 'No income found with the given id'
        })
    }

    // Deleting income object at the Id reference provided in request.
    try {
        const successfulDeletion = await deleteDataFromDb(incomeRef, incomeId);
        if (successfulDeletion) {
            // console.log("Income successfully deleted");
            res.status(200).json({
                success: true,
                message: `Income with ${incomeId} deleted`
            }
        )
        } else {
            // console.log("Income deletion failed.")
            res.status(500).json({
                success: false,
                message: `Failed to delete income`
            })
        }
    } catch (error) {
        // console.log(`Error in deleting income: ${error}`);
        res.status(500).json({
            success: false,
            error: `Error in deleting income`
        })
    }
}

module.exports = {getIncome, createIncome, updateIncome, deleteIncome};