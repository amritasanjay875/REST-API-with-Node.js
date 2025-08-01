const express = require('express');
const userRoute = require('./routes/users');
const incomeRoute = require('./routes/income');
const expenseRoute = require('./routes/expenses');

const app = express();

// Middleware Functions
app.use(express.json()); // For parsing JSON requests
app.use(express.static("public")); // For serving static files in 'public' folder.

// Routes for users, income and expenses.
app.use('/users', userRoute);
app.use('/income', incomeRoute);
app.use('/expenses', expenseRoute);

// app.get("/", (req,res) => {
//     res.send("Setup works correctly");
// })

app.listen(3000, () => {
    console.log("Server listening on Port 3000");
})