const { initializeApp } = require('firebase/app');
const { getDatabase, ref } = require("firebase/database");
const dotenv = require('dotenv');

dotenv.config();

// Firebase credentials securely stored in .env folder. Steps given in README.md for firebase credentials.
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References for endpoints: users, income, expenses.
const userRef = ref(database, "users");
const incomeRef = ref(database, "income");
const expenseRef = ref(database, "expenses");

module.exports = {userRef, incomeRef, expenseRef};