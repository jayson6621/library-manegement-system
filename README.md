# Community Library Management System

## About the Project

This project is a library management system I created for my
Web Application Development assignment.

The system helps a community library manage its books, keep track
of available stock, record transactions, and manage users.

I used React to build the application and Local Storage to save
the information in the browser.

## Main Features

### Dashboard
- Shows the total number of books.
- Shows the total quantity of books available.
- Shows books with low stock.
- Shows the total number of users.

### Books
- Add new books.
- Update book information.
- Delete books.
- View book quantities and availability.
- Check for duplicate ISBN numbers.

### Transactions
- Record borrowed books.
- Add stock when new books arrive.
- View transaction history.
- Prevent borrowing more books than are available.

### Users
- Add new users.
- Update and delete users.
- Assign roles to users.
- Log in using a membership ID and role.
- Check for duplicate membership IDs.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- React Router
- Local Storage
- Vite

## How to Run the Project

First, install Node.js on your computer.

Open the project folder in a terminal and run:

    npm install

After installation, start the application:

    npm run dev

Open the local address shown in the terminal to use the system.

To create a production build, run:

    npm run build

## Data Storage

The system saves books, users, and transaction records in the
browser's Local Storage. This allows the information to remain
saved when the page is refreshed.

## Student Details

Name: Mpho Selefo

Course: BSCSM

Module: Web Application Development (BIWA2110)