/*------------------------------- Starter Code -------------------------------*/

const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const Customer = require('./models/customer');
require('dotenv').config();

 // Connect to MongoDB using the MONGODB_URI specified in our .env file.
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const displayMenu = () => {
    console.log(`
Welcome to the CRM

What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit
    `);
};

const createCustomer = async () => {
    const name = prompt('What is the customer\'s name? ');
    const age = parseInt(prompt('What is the customer\'s age? '), 10);
    const customer = new Customer({ name, age });
    await customer.save();
    console.log('Customer created successfully!');
};

const viewCustomers = async () => {
    const customers = await Customer.find();
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
};

const updateCustomer = async () => {
    const customers = await Customer.find();
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt('Copy and paste the id of the customer you would like to update here: ');
    const name = prompt('What is the customer\'s new name? ');
    const age = parseInt(prompt('What is the customer\'s new age? '), 10);
    await Customer.findByIdAndUpdate(id, { name, age });
    console.log('Customer updated successfully!');
};

const deleteCustomer = async () => {
    const customers = await Customer.find();
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt('Copy and paste the id of the customer you would like to delete here: ');
    await Customer.findByIdAndDelete(id);
    console.log('Customer deleted successfully!');
};

const main = async () => {
    let running = true;
    while (running) {
        displayMenu();
        const choice = prompt('Number of action to run: ');
        switch (choice) {
            case '1':
                await createCustomer();
                break;
            case '2':
                await viewCustomers();
                break;
            case '3':
                await updateCustomer();
                break;
            case '4':
                await deleteCustomer();
                break;
            case '5':
                running = false;
                break;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
    mongoose.connection.close();
    console.log('Exiting...');
};

main();