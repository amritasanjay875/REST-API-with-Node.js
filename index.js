// Using Modular SDK throughout since Firebase Config modules were imported using Modular SDK.
import express from 'express';
import userRoute from './routes/users.js';
import incomeRoute from './routes/income.js';
import expenseRoute from './routes/expenses.js';

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