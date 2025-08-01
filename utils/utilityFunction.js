// Firebase SDK imported using Modular SDK.
import {get, push, set, child, remove} from 'firebase/database';

// Function to read data from DB. The ref to the database will be passed to the function from the corresponding controller.
async function readDataFromDB(dataRef) {
    try {
        const data = await get(dataRef);
        if(data.exists()) {
            console.log(data.val());
            return data.val();
        } else {
            console.log("No data available");
        }
    } catch(error) {
        console.log(`Error reading from DB ${error}`);
    }
}

// Function to fetch the record corresponding to a given ID. Used in PUT and DELETE requests.
async function getDataBasedOnId(dataRef, uniqueId) {
    // Fetching the child node of the dataRef with the corresponding Id.
    const data = child(dataRef, uniqueId);
    try {
        const snapshot = await get(data);
        return snapshot.val();
    } catch(error) {
        console.log(error);
    }
}

// Function to write user data to the DB. The ref to database is passed to function from controller.
async function writeUserDataToDB(dataRef, user) {
    try{
        // Using push(dataRef) to create a new child node under dataRef with a unique Id.
        const data = push(dataRef);
        await set(data, {
            name: user.name,
            username: user.username,
            email: user.email,
            address: {
                street: user.address.street,
                suite: user.address.suite,
                city: user.address.city,
                zipcode: user.address.zipcode
            }
        })
        console.log("Data written to Firebase DB")
        // On successful write completion, set returns the value: undefined(falsy value). Hence returning true on success.
        return true;   
    } catch(error) {
        console.log(`Error writing to DB ${error}`);
    }   
}

// Function to update record in DB corresponding to given Id.
async function updateDataInDB(dataRef, uniqueId, dataFromUser) {
    // Fetching the child node of the dataRef with the corresponding Id.
    const data = child(dataRef, uniqueId);
    try {
        // Writing the modified data to the reference of the Id provided by user.
        await set(data, dataFromUser);
        // On successful write completion, set returns the value: undefined(falsy value). Hence returning true on success.
        return true;
    } catch(error) {
        console.log(error);
    }
}

// Function to delete record in DB corresponding to given Id.
async function deleteDataFromDb(dataRef, uniqueId) {
    // Fetching the child node of the dataRef with the corresponding Id.
    const data = child(dataRef, uniqueId);
    try {
        await remove(data);
        // On successful deletion, remove returns the value: undefined(falsy value). Hence returning true on success.
        return true;
    } catch(error) {
        console.log(error);
    } 
}

// Function to write income data to DB.
async function writeIncomeDataToDB(dataRef, income) {
    try{
        const data = push(dataRef);
        await set(data, {
            wages : income.wages,
            secondaryIncome: income.secondaryIncome,
            interest: income.interest,
            supportPayment: income.supportPayment,
            others : income.others
        })
        console.log("Data written to Firebase DB")
        // On successful write completion, set returns the value: undefined(falsy value). Hence returning true on success.
        return true;   
    } catch(error) {
        console.log(`Error writing to DB ${error}`);
    }   
}

// Function to write expense data to DB.
async function writeExpenseDataToDB(dataRef, expense) {
    try{
        const data = push(dataRef);
         await set(data, {
            savings: {
                rrsp: expense.savings.rrsp,
                investmentSavings: expense.savings.investmentSavings,
                longTermSavings: expense.savings.longTermSavings,
                bonds: expense.savings.bonds,
                others: expense.savings.others
            },
            paymentObligations: {
                creditCard: expense.paymentObligations.creditCard,
                loan: expense.paymentObligations.loan,
                vehicleLease: expense.paymentObligations.vehicleLease,
                lineOfCredit: expense.paymentObligations.lineOfCredit
            },
            insurance: {
                lifeInsurance: expense.insurance.lifeInsurance,
                healthInsurance: expense.insurance.healthInsurance,
                others: expense.insurance.others
            },
            housing: {
                rent: expense.housing.rent,
                rentInsurance: expense.housing.rentInsurance,
                storageAndParking: expense.housing.storageAndParking,
                utilities: expense.housing.utilities,
                maintainance: expense.housing.maintainance
            },
            utilities: {
                phone: expense.utilities.phone,
                internet: expense.utilities.internet,
                water: expense.utilities.water,
                heat: expense.utilities.heat,
                electricity: expense.utilities.electricity,
                cable: expense.utilities.cable,
                others: expense.utilities.others
            },
            personal: {
                transportation: expense.personal.transportation,
                clothing: expense.personal.clothing,
                giftsFamily: expense.personal.giftsFamily,
                personalGrooming: expense.personal.personalGrooming,
                diningOut: expense.personal.diningOut,
                hobbies: expense.personal.hobbies,
                others: expense.personal.others
            }
        })
        console.log("Data written to Firebase DB");
        // On successful write completion, set returns the value: undefined(falsy value). Hence returning true on success.
        return true;
    } catch(error) {
        console.log(`Error writing to DB ${error}`);
    }   
}

export {readDataFromDB, getDataBasedOnId, writeUserDataToDB, updateDataInDB, deleteDataFromDb, writeIncomeDataToDB, writeExpenseDataToDB};