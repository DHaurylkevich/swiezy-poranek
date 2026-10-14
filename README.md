# Świeży Poranek --- Catering Platform

A full-stack catering website built for **Świeży Poranek**, a catering
business in Poznań, Poland. The application lets customers explore
catering packages and proceed through an online order flow. It also
includes an admin area for managing the website's content and orders.

**Live website:** https://swiezy-poranek.vercel.app

## Features

### Customer-facing website

-   Browse catering packages and menu information.
-   Select a package and add-ons.
-   Enter delivery details and review an order before submitting it.
-   Browse the website through a responsive, routed Vue application.

### Admin panel

-   Admin authentication with JWT.
-   Manage catering packages and their images.
-   Manage menu items.
-   View and update order statuses.
-   Manage contact information and gallery images.
-   Change the admin password.

### Backend API

-   REST API built with Express.
-   MongoDB persistence through Mongoose.
-   Protected endpoints for administrative operations.
-   Image uploads to Cloudinary.
-   Request logging and JSON request parsing.

## Tech stack

  Area                       Technologies
  -------------------------- -------------------------------------
  Frontend                   Vue 3, Vue Router, Vuex, Axios
  Frontend tooling           Vue CLI, Webpack, Babel, ESLint
  Backend                    Node.js, Express
  Database                   MongoDB, Mongoose
  Authentication             JSON Web Tokens (JWT), bcrypt
  Media storage              Cloudinary, Multer
  Other backend middleware   CORS, cookie-parser, Morgan, dotenv

## Project structure

``` text
swiezy-poranek/
├── client/        # Vue frontend
│   ├── src/
│   │   ├── router/    # Public, ordering, and admin routes
│   │   ├── store/     # Vuex application state
│   │   ├── services/  # API calls
│   │   ├── views/     # Home, order flow, and admin pages
│   │   └── ...
│   └── package.json
└── server/        # Express REST API
    ├── src/
    │   ├── config/       # Database configuration
    │   ├── controllers/  # Request handlers
    │   ├── middleware/   # Authentication and uploads
    │   ├── models/       # Mongoose models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utility/
    ├── index.js
    └── package.json
```

## Getting started

### Prerequisites

-   Node.js and npm
-   A MongoDB database
-   A Cloudinary account for image uploads

### 1. Clone the repository

``` bash
git clone https://github.com/DHaurylkevich/swiezy-poranek.git
cd swiezy-poranek
```

The repository uses the `server` branch for the application source.

### 2. Configure the backend

``` bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use your own credentials. Do not commit `.env` files or expose
production secrets.

Start the backend in development mode:

``` bash
npm run dev
```

The API starts on port `5000` by default. The root endpoint (`/`)
returns a simple server status message; API routes are mounted under
`/api`.

### 3. Configure the frontend

Open a second terminal:

``` bash
cd client
npm install
npm run serve
```

Vue CLI will print the local development URL in the terminal.

The frontend must be configured to send API requests to the backend you
are running. Check the API base URL in the frontend
service/configuration files and update it for your local environment if
necessary.

### 4. Build the frontend

From the `client/` directory:

``` bash
npm run build
```

Run the frontend linter with:

``` bash
npm run lint
```

## API overview

The API is mounted under `/api`.

  -----------------------------------------------------------------------
  Resource                Base path               Purpose
  ----------------------- ----------------------- -----------------------
  Admin                   `/api/admin`            Admin login, logout,
                                                  and password change

  Packages                `/api/package`          Retrieve and manage
                                                  catering packages

  Orders                  `/api/order`            Create, retrieve,
                                                  update, and delete
                                                  orders

  Contacts                `/api/contacts`         Retrieve and manage
                                                  contact information

  Images                  `/api/image`            Retrieve, upload, and
                                                  delete gallery images

  Menu                    `/api/menu`             Retrieve and manage
                                                  menu items

  Authentication          `/api/auth`             Check authentication
                                                  and refresh a token
  -----------------------------------------------------------------------

Administrative routes that require authentication expect a JWT in the
request's `Authorization` header using the `Bearer <token>` format.

## Implementation notes

-   The frontend uses Vue Router for navigation and Vuex to store shared
    state such as packages, basket items, and order data.
-   The backend separates routes, controllers, services, and Mongoose
    models.
-   Package and gallery image uploads are handled through Multer and
    Cloudinary.
-   MongoDB connection settings and service credentials are supplied
    through environment variables.

## Current limitations

-   The backend's `test` script is a placeholder; automated tests are
    not configured through that script.
-   The project requires valid MongoDB and Cloudinary credentials for
    the corresponding features to work.
-   The frontend API base URL should be checked before running the
    application locally.

## License

The backend package currently declares the ISC license. Check the
repository's licensing requirements before reusing or redistributing the
project.
