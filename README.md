

# Banka


## Project Overview
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals.

This app is meant to support a single bank, where users can signup and create bank accounts 
online, but must visit the branch to withdraw or deposit money.


### Required Features
1. User (client) can sign up.
2. User (client) can login.
3. User (client) can create an account.
4. User (client) can view account transaction history.
5. User (client) can view a specific account transaction.
6. Staff (cashier) can debit user (client) account.
7. Staff (cashier) can credit user (client) account.
8. Admin/staff can view all user accounts.
9. Admin/staff can view a specific user account.
10. Admin/staff can activate or deactivate an account11. Admin/staff can delete a specific user account.
12. Admin can create staff and admin user accounts.

### Optional Features
1. User can reset password.
2. Integrate real time email notification upon credit/debit transaction on user account
3. User can upload a photo to their profile.


### UI Templates
The UI templates can be found here [Banka](https://iykeevans.github.io/banka/UI)


### Pivotal Tracker

Project is currently being managed with Pivotal Tracker, a project management tool. You can find the stories on the [Banka Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2320198)


### Author
Ezeani Ikenna

### Acknowledgements
* Andela



[![Build Status](https://travis-ci.org/iykeevans/banka.svg?branch=develop)](https://travis-ci.org/iykeevans/banka) [![Coverage Status](https://coveralls.io/repos/github/iykeevans/banka/badge.svg?branch=develop)](https://coveralls.io/github/iykeevans/banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/04c3906572ce69feed57/maintainability)](https://codeclimate.com/github/iykeevans/banka/maintainability)
# Banka
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money
## Prerequisites
To run this application, you should have the following:
- Node
- NPM/Yarn (NPM comes with Node)
## Installation
Follow the instructions to have the app up and run:
- clone the repo: RUN THE COMMAND
```shell
>> git clone https://github.com/iykeevans/banka.git
```
- Install the production depency: RUN THE COMMAND
```shell
>> npm i --prod
```
- Transpile the code: RUN THE COMMAND
```shell
>> npm run build
```
- Start the server: RUN THE COMMAND
```shell
>> npm run start
```
- You should use ```localhost:4000``` as your base url

## Features

* User (client) can sign up.
* User (client) can login.
* User (client) can create an account.
* User (client) can view account transaction history.
* User (client) can view a specific account transaction.
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.

## Optional features

* User can reset password.
* integrate realtime notification upon credit/debit transaction on user account.
* User can upload a photo to their profile.


## Running the test
To run the test USE the following command
```shell
>> npm run test
```
#### What does this test covers?
The test covers all the endpoints and requests sent to them.

## Deployments
This application was deployed to the following:
- [Heroku](https://andela-bank.herokuapp.com) : For API endpoints.
- [Github Pages](https://iykeevans.github.io/banka/UI) : UI template for this application.
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2320198) : Pivot Tracker stories

## API Endpoints
| METHOD   | DESCRIPTION                                  | ENDPOINTS                 
| ---------|----------------------------------------------| ------------------------------------------------| 
| POST     | User's Sign up                               | `/api/v1/auth/signup`                           |
| POST     | User's Sign in                               | `/api/v1/auth/signin`                           |  
| POST     | Create a bank account                        | `/api/v1/accounts`                              |   
| PATCH    | Activate or deactive an account              | `/api/v1/accounts/<accountNumber>`              | 
| DELETE   | Delete an account                            | `/api/v1/accounts/<accountNumber>`              |
| POST     | Perform a debit transaction                  | `/api/v1/transactions/<accountNumber>/debit`    |
| POST     | Perform a credit transaction                 | `/api/v1/transactions/<accountNumber>/credit`   |
| GET      | View an account's transaction history        | `/api/v1/accounts/<accountNumber>/transactions` |
| GET      | View all account's owned by a specific user  | `/api/v1/user/<email>/accounts`                 |
| GET      | View a specific transaction                  | `/api/v1/transactions/<transactionId>`          |
| GET      | View a specific account                      | `/api/v1/accounts/<accountNumber>`              |
| GET      | View all accounts                            | `/api/v1/accounts`                              |
| GET      | View all active bank accounts                | `/api/v1/accounts?status=active`                |
| GET      | View all dormant bank accounts               | `/api/v1/accounts?status=dormant`               |

## Acknowledgments
[Andela](https://www.andela.com)