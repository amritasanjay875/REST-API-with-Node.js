// Used Modular SDK in FirebaseConfig. Hence using the same import here.
import {expenseRef} from '../config/firebaseConfig.js';
// Since already used, ES Modular syntax, maintaining the same strucutre throughout.
import {readDataFromDB, writeExpenseDataToDB, getDataBasedOnId, updateDataInDB, deleteDataFromDb} from '../utils/utilityFunction.js';

// Function to fetch Expenses from DB. Uses utility function to read data from DB.
async function getExpense(req,res) {
    try {
        const expenses = await readDataFromDB(expenseRef);
        res.status(200).json({
            success: true,
            message: 'Expenses successfully retreived from DB',
            data: expenses
        });
    } catch(error) {
        // console.log(error);
        res.status(500).json({
            success: false,
           message: `Error reading expenses from DB: ${error}`
        })  
    }
}

// Function to create new expenses in DB. Uses utility function to write data to DB.
async function createExpense(req,res) {
    // Destructuring req body to extract data.
    const { savings: {
                rrsp,
                investmentSavings,
                longTermSavings,
                bonds,
                others : savingsOthers
            },
            paymentObligations: {
                creditCard,
                loan,
                vehicleLease,
                lineOfCredit
            },
            insurance: {
                lifeInsurance,
                healthInsurance,
                others : insuranceOthers
            },
            housing: {
                rent,
                rentInsurance,
                storageAndParking,
                utilities,
                maintainance
            },
            utilities: {
                phone,
                internet,
                water,
                heat,
                electricity,
                cable,
                others : utilitiesOthers
            },
            personal: {
                transportation,
                clothing,
                giftsFamily,
                personalGrooming,
                diningOut,
                hobbies,
                others : personalOthers
            }
        } = req.body;

    // Check if any values are missing.    
    if(!rrsp || !investmentSavings || !longTermSavings || !bonds || !savingsOthers || !creditCard || !loan || !vehicleLease || !lineOfCredit 
        || !lifeInsurance || !healthInsurance || !insuranceOthers || !rent || !rentInsurance || !storageAndParking || !utilities || !maintainance
        || !phone || !internet || !water || !heat || !electricity || !cable || !utilitiesOthers || !transportation || !clothing || !giftsFamily 
        || !personalGrooming || !diningOut || !hobbies || !personalOthers) {
        return res.status(400).json({
            success: false,
            error: `All fields:
            Savings: rrsp, investment savings, long term savings, bonds, others; 
            Payment obligations: credit card, loan, vehicle lease, line of credit card, 
            Insurance: life insurance, health insurance, others; 
            Housing: rent, rent insurance, storage and parking, utilities, maintainance; 
            Utilities: phone, internet, water, heat, electricity, cable, others; 
            Personal: transportation, clothing, gifts family, personal grooming, dining out, hobbies, others) are required.`
        })
    }

    // Creating new expense object with given values.
    const newExpense = {
        savings: {
                rrsp,
                investmentSavings,
                longTermSavings,
                bonds,
                others: savingsOthers
            },
            paymentObligations: {
                creditCard,
                loan,
                vehicleLease,
                lineOfCredit
            },
            insurance: {
                lifeInsurance,
                healthInsurance,
                others: insuranceOthers
            },
            housing: {
                rent,
                rentInsurance,
                storageAndParking,
                utilities,
                maintainance
            },
            utilities: {
                phone,
                internet,
                water,
                heat,
                electricity,
                cable,
                others: utilitiesOthers
            },
            personal: {
                transportation,
                clothing,
                giftsFamily,
                personalGrooming,
                diningOut,
                hobbies,
                others: personalOthers
            }
    }


    // Writing data to DB and creating new expense in DB.
    try {
        const dataToDb = await writeExpenseDataToDB(expenseRef, newExpense);
        if(!dataToDb) {
            return res.status(500).json({
                success: false,
                error: 'Write data to db failed.'
            }) 
        } else {
            res.status(201).json({
                success: true,
                message: 'Expense created',
                data: newExpense
            })
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            error: `Error writing expense to DB: ${error}`
        })
    }    
}


// Function to update expenses in DB, based on given Id. Uses utility functions to fetch record based on Id and update record.
async function updateExpense(req,res) {
    const expenseId = req.params.id;
    // console.log("Expense id from PUT: ",expenseId);
    let expense = {};

    // Destructuring req body to extract existing values.
    const {
        savings = {},
        paymentObligations = {},
        insurance = {},
        housing = {},
        utilities = {},
        personal = {}
    } = req.body;
    const {rrsp, investmentSavings, longTermSavings, bonds, others: savingsOthers} = savings;
    const {creditCard, loan, vehicleLease, lineOfCredit} = paymentObligations;
    const {lifeInsurance, healthInsurance, others: insuranceOthers} = insurance;
    const {rent, rentInsurance, storageAndParking, utilities: housingUtilities, maintainance} = housing;
    const {phone, internet, water, heat, electricity, cable, others: utilitiesOthers} = utilities;
    const {transportation, clothing, giftsFamily, personalGrooming, diningOut, hobbies, others: personalOthers} = personal;


    // Fetch record based on given Id
    try {
        expense = await getDataBasedOnId(expenseRef, expenseId);
        // console.log(expense);
    } catch (error) {
        // console.log(`Error in retreving expense with given Id: ${error}`);
        res.status(500).json({
            success: false,
            error: `Error in retreiving expense with given Id: ${error}` 
        })
    }

    // Check for if expense exists with given Id.
    if(!expense) {
        return res.status(404).json({
            success: false,
            error: 'No expense found with the given id'
        })
    }

    // Check for if atleast one value is given for updation.
    if(!rrsp && !investmentSavings && !longTermSavings && !bonds && !savingsOthers && !creditCard && !loan && !vehicleLease && !lineOfCredit 
        && !lifeInsurance && !healthInsurance && !insuranceOthers && !rent && !rentInsurance && !storageAndParking && !housingUtilities && !maintainance
        && !phone && !internet && !water && !heat && !electricity && !cable && !utilitiesOthers && !transportation && !clothing && !giftsFamily 
        && !personalGrooming && !diningOut && !hobbies && !personalOthers) {
        return res.status(400).json({
            success: false,
            error: `Atleast one field must be provided for updation.`
        })
    }

    // Rewriting expense object values with new values, if they exist, else retaining existing values.
    if(expense.savings !== undefined) {
        expense.savings.rrsp = rrsp || expense.savings.rrsp;
        expense.savings.investmentSavings = investmentSavings || expense.savings.investmentSavings;
        expense.savings.longTermSavings = longTermSavings || expense.savings.longTermSavings;
        expense.savings.bonds = bonds || expense.savings.bonds;
        expense.savings.others = savingsOthers || expense.savings.others;
    }
    if(expense.paymentObligations !== undefined) {
        expense.paymentObligations.creditCard = creditCard || expense.paymentObligations.creditCard;
        expense.paymentObligations.loan = loan || expense.paymentObligations.loan;
        expense.paymentObligations.vehicleLease = vehicleLease || expense.paymentObligations.vehicleLease;
        expense.paymentObligations.lineOfCredit = lineOfCredit || expense.paymentObligations.lineOfCredit;
    }
    if(expense.insurance !== undefined) {
        expense.insurance.lifeInsurance = lifeInsurance || expense.insurance.lifeInsurance;
        expense.insurance.healthInsurance = healthInsurance || expense.insurance.healthInsurance;
        expense.insurance.others = insuranceOthers || expense.insurance.others;
    }
    if(expense.housing !== undefined) {
        expense.housing.rent = rent || expense.housing.rent;
        expense.housing.rentInsurance = rentInsurance || expense.housing.rentInsurance;
        expense.housing.storageAndParking = storageAndParking || expense.housing.storageAndParking;
        expense.housing.utilities = housingUtilities || expense.housing.utilities;
        expense.housing.maintainance = maintainance || expense.housing.maintainance;
    }
    if(expense.utilities !== undefined) {
        expense.utilities.phone = phone || expense.utilities.phone;
        expense.utilities.internet = internet || expense.utilities.internet;
        expense.utilities.water = water || expense.utilities.water;
        expense.utilities.heat = heat || expense.utilities.heat;
        expense.utilities.electricity = electricity || expense.utilities.electricity;
        expense.utilities.cable = cable || expense.utilities.cable;
        expense.utilities.others = utilitiesOthers || expense.utilities.others;
    }
    if(expense.personal !== undefined) {
        expense.personal.transportation = transportation || expense.personal.transportation;
        expense.personal.clothing = clothing || expense.personal.clothing;
        expense.personal.giftsFamily = giftsFamily || expense.personal.giftsFamily;
        expense.personal.personalGrooming = personalGrooming || expense.personal.personalGrooming;
        expense.personal.diningOut = diningOut || expense.personal.diningOut;
        expense.personal.hobbies = hobbies || expense.personal.hobbies;
        expense.personal.others = personalOthers || expense.personal.others;
    }
    
    // Writing updated expense object back to DB with corresponding Id reference.
    try {
        const dataToDb = await updateDataInDB(expenseRef, expenseId, expense);
        if(!dataToDb) {
            return res.status(500).json({
                success: false,
                error: 'Expense update to db failed.'
            }) 
        } else {
            res.status(200).json({
                success: true,
                message: 'Expense updated',
                data: expense
            })
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Error updating expense to DB: ${error}`
        })
    }   
}

// Function to delete expenses in DB, based on given Id. Uses utility functions to fetch record based on Id and delete record.
async function deleteExpense(req, res) {
    // Extracting Id from request.
    const expenseId = req.params.id;
    let expense = {};

    // Fetch record based on given Id
    try {
        expense = await getDataBasedOnId(expenseRef, expenseId);
        // console.log(expense);
    } catch (error) {
        // console.log(`Error in retreving expense with given Id: ${error}`);
        res.status(400).json({
            success: false,
            error: `Error in retreving expense with given Id: ${error}`
        })
    }    

    // Check for if expense exists with given Id.
    if(!expense) {
        return res.status(404).json({
            success: false,
            error: 'No expense found with the given id'
        })
    }

    // Deleting expense object at the Id reference provided in request.
    try {
        const successfulDeletion = await deleteDataFromDb(expenseRef, expenseId);
        if (successfulDeletion) {
            // console.log("Expense successfully deleted");
            res.status(200).json({
                success: true,
                message: `Expense with ${expenseId} deleted`
            }
        )
        } else {
            // console.log("Expense deletion failed.")
            res.status(500).json({
                success: false,
                error: 'Error in deleting expense'
            })
        }
    } catch (error) {
        // console.log(`Error in deleting expense: ${error}`);
        res.status(500).json({
            success: false,
            error: `Error deleting expense : ${error}`
        })
    }
}

export {getExpense, createExpense, updateExpense, deleteExpense};