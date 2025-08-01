// Using ESM import syntax for importing Firebase using Modular SDK.
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";
import dotenv from 'dotenv';

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

// Since using modular imports, using export instead of module.exports.
export {userRef, incomeRef, expenseRef};