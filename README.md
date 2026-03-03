# Brandy - MERN E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) as a graduation project. The platform supports product browsing, user authentication, shopping cart, PayPal checkout, an admin dashboard, Google Maps integration for shipping addresses, and more.

## Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| **Frontend**     | React 18, React Router 6, React Bootstrap 5         |
| **Backend**      | Node.js (ES Modules), Express 4                     |
| **Database**     | MongoDB Atlas (Mongoose 7)                          |
| **Auth**         | JWT + bcryptjs                                      |
| **Payments**     | PayPal (`@paypal/react-paypal-js`)                  |
| **File Uploads** | Multer (local disk storage)                         |
| **Email**        | Mailgun (password reset)                            |
| **Maps**         | Google Maps API (`@react-google-maps/api`)          |
| **Charts**       | react-google-charts (admin dashboard)               |
| **State Mgmt**   | React Context + `useReducer`                       |
| **Deployment**   | Vercel / Heroku                                     |

## Project Structure

```
e-commerce-graduation/
├── package.json                 # Root workspace (concurrently)
├── vercel.json                  # Vercel deployment config
│
├── backend/
│   ├── server.js                # Express entry point
│   ├── config.env               # Environment variables
│   ├── package.json
│   ├── data.js                  # Seed data (users + products)
│   ├── controller/
│   │   ├── orderController.js   # Order CRUD, payment, delivery
│   │   ├── productController.js # Product CRUD, search, filtering
│   │   ├── userController.js    # Auth, profile, password reset
│   │   ├── uploadController.js  # File upload handling
│   │   └── seedController.js    # Database seeding
│   ├── models/
│   │   ├── orderModel.js        # Order schema
│   │   ├── productModel.js      # Product schema (with reviews)
│   │   └── userModel.js         # User schema
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── seedRoutes.js
│   ├── utils/
│   │   ├── isAuth.js            # JWT verification middleware
│   │   ├── isAdmin.js           # Admin check middleware
│   │   ├── generateToken.js     # JWT token generation
│   │   ├── mailGun.js           # Mailgun email helper
│   │   └── payOrder.js          # Order confirmation email template
│   └── uploads/                 # Uploaded files directory
│
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js               # Root component with routing
        ├── Store.js             # Global state (Context + useReducer)
        ├── index.js             # Entry point
        ├── utils.js             # Utility helpers
        ├── components/
        │   ├── Product.js       # Product card
        │   ├── SearchBox.js     # Search input
        │   ├── CheckoutSteps.js # Checkout progress indicator
        │   ├── Rating.js        # Star rating display
        │   ├── LoadingBox.js    # Loading spinner
        │   ├── MessageBox.js    # Alert messages
        │   ├── ProtectedRoute.js
        │   └── AdminRoute.js
        ├── context/
        │   └── CategoryContext.js
        └── screens/
            ├── HomeScreen.js
            ├── CartScreen.js
            ├── SearchScreen.js
            ├── DashboardScreen.js
            ├── ShippingAddressScreen.js
            ├── PaymentMethodScreen.js
            ├── MapScreen.js
            ├── authentication/
            │   ├── SigninScreen.js
            │   └── SignupScreen.js
            ├── passwordManagement/
            │   ├── ForgetPasswordScreen.js
            │   └── ResetPasswordScreen.js
            ├── products/
            │   ├── ProductScreen.js
            │   ├── ProductListScreen.js
            │   └── ProductEditScreen.js
            ├── orders/
            │   ├── OrderScreen.js
            │   ├── OrderHistoryScreen.js
            │   ├── OrderListScreen.js
            │   └── PlaceOrderScreen.js
            └── users/
                ├── UserProfileScreen.js
                ├── UserListScreen.js
                └── UserEditScreen.js
```

## Features

### Customer-Facing

- **Product Catalog** - Browse products on the home page grid
- **Search & Filter** - Search by keyword, filter by category, price range, rating, and sort order (featured, price low/high, top rated, newest)
- **Product Details** - View product images, description, price, stock status, and rating
- **Shopping Cart** - Add/remove items, adjust quantities, view subtotals
- **Multi-Step Checkout** - Sign In → Shipping Address → Payment Method → Place Order
- **PayPal Payments** - Integrated PayPal checkout on the order page
- **Google Maps** - Pick a shipping location on an interactive map
- **Order History** - View past orders and their statuses
- **User Profile** - Update name, email, and password
- **Password Reset** - Forgot password flow via Mailgun email

### Admin Panel

- **Dashboard** - Overview with total users, orders, sales, daily sales line chart, and category distribution pie chart
- **Product Management** - Create, edit, and delete products with image upload
- **Order Management** - View all orders, mark as delivered, delete orders
- **User Management** - View all users, edit roles (admin/regular), delete users

## Data Models

### User

| Field        | Type    | Notes                     |
| ------------ | ------- | ------------------------- |
| `name`       | String  | Required                  |
| `email`      | String  | Required, unique          |
| `password`   | String  | Required, hashed (bcrypt) |
| `resetToken` | String  | For password reset        |
| `isAdmin`    | Boolean | Default: `false`          |

### Product

| Field          | Type       | Notes                          |
| -------------- | ---------- | ------------------------------ |
| `name`         | String     | Required                       |
| `slug`         | String     | Required, unique               |
| `image`        | String     | Required                       |
| `images`       | [String]   | Additional images              |
| `brand`        | String     | Required                       |
| `category`     | String     | Required                       |
| `description`  | String     | Required                       |
| `price`        | Number     | Required                       |
| `countInStock` | Number     | Required                       |
| `rating`       | Number     | Default: `0`                   |
| `numReviews`   | Number     | Default: `0`                   |
| `reviews`      | [Review]   | Embedded (name, rating, comment, user ref) |
| `user`         | ObjectId   | Ref to User (creator)          |

### Order

| Field             | Type     | Notes                                        |
| ----------------- | -------- | -------------------------------------------- |
| `orderItems`      | [Object] | slug, name, quantity, image, price, product ref |
| `shippingAddress`  | Object   | fullName, address, city, postalCode, country, location (lat/lng) |
| `paymentMethod`   | String   |                                              |
| `paymentResult`   | Object   | id, status, update_time, email_address       |
| `itemsPrice`      | Number   |                                              |
| `shippingPrice`   | Number   |                                              |
| `taxPrice`        | Number   |                                              |
| `totalPrice`      | Number   |                                              |
| `user`            | ObjectId | Ref to User                                  |
| `isPaid`          | Boolean  | Default: `false`                             |
| `paidAt`          | Date     |                                              |
| `isDelivered`     | Boolean  | Default: `false`                             |
| `deliveredAt`     | Date     |                                              |

## API Endpoints

### Products (`/api/products`)

| Method | Path               | Auth       | Description                          |
| ------ | ------------------ | ---------- | ------------------------------------ |
| GET    | `/`                | None       | List all products                    |
| GET    | `/admin`           | Admin      | Paginated product list for admin     |
| GET    | `/search`          | None       | Search/filter products               |
| GET    | `/categories`      | None       | Get distinct categories              |
| GET    | `/slug/:slug`      | None       | Get product by slug                  |
| GET    | `/:id`             | None       | Get product by ID                    |
| POST   | `/`                | Admin      | Create a product                     |
| PUT    | `/:id`             | Admin      | Update a product                     |
| DELETE | `/:id`             | Admin      | Delete a product                     |

### Users (`/api/users`)

| Method | Path               | Auth       | Description                          |
| ------ | ------------------ | ---------- | ------------------------------------ |
| POST   | `/signin`          | None       | Sign in, returns JWT                 |
| POST   | `/signup`          | None       | Register, returns JWT                |
| GET    | `/`                | Admin      | List all users                       |
| GET    | `/:id`             | Admin      | Get user by ID                       |
| PUT    | `/profile`         | User       | Update own profile                   |
| PUT    | `/:id`             | Admin      | Update user (admin)                  |
| DELETE | `/:id`             | Admin      | Delete user                          |
| POST   | `/forget-password` | None       | Request password reset email         |
| POST   | `/reset-password`  | None       | Reset password with token            |

### Orders (`/api/orders`)

| Method | Path               | Auth       | Description                          |
| ------ | ------------------ | ---------- | ------------------------------------ |
| POST   | `/`                | User       | Place a new order                    |
| GET    | `/`                | Admin      | List all orders                      |
| GET    | `/mine`            | User       | Current user's order history         |
| GET    | `/summary`         | Admin      | Dashboard summary aggregates         |
| GET    | `/:id`             | User       | Get order details                    |
| PUT    | `/:id/pay`         | User       | Record payment (PayPal callback)     |
| PUT    | `/:id/deliver`     | User       | Mark as delivered                    |
| DELETE | `/:id`             | Admin      | Delete an order                      |

### Upload (`/api/upload`)

| Method | Path | Auth | Description            |
| ------ | ---- | ---- | ---------------------- |
| POST   | `/`  | User | Upload a file (image)  |

### Other

| Method | Path               | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/api/seed`        | Seed database with sample data |
| GET    | `/api/keys/paypal` | Get PayPal client ID       |
| GET    | `/api/keys/google` | Get Google Maps API key    |

## Getting Started

### Prerequisites

- **Node.js** >= 14.0.0
- **npm**
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) account)

### Environment Variables

Create a `backend/config.env` file with the following variables:

```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# Auth
JWT_SECRET=your_jwt_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_KEY=your_paypal_secret_key

# Cloudinary (optional, not currently wired into upload flow)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain

# Base URL (for email links)
BASE_URL=http://localhost:3000
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd e-commerce-graduation

# Install root dependencies
npm install

# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend
```

### Running in Development

```bash
# Run both backend and frontend concurrently
npm run dev
```

- **Backend** runs on `http://localhost:5000`
- **Frontend** runs on `http://localhost:3000` (proxied to backend)

### Running Individually

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

### Seeding the Database

Visit `http://localhost:5000/api/seed` in your browser to populate the database with sample users and products.

**Default seed users:**

| Email              | Password   | Role  |
| ------------------ | ---------- | ----- |
| admin@example.com  | 123456     | Admin |
| user@example.com   | 123456     | User  |

### Production Build

```bash
# Build the frontend
npm run build --prefix frontend
```

In production mode (`NODE_ENV=production`), the Express server serves the React build as static files.

## Deployment

### Vercel

The project includes a `vercel.json` that configures:
- Backend as a serverless Node.js function
- Frontend as a static build
- Routes: `/api/*` and `/uploads/*` go to the backend; everything else serves the frontend

### Heroku

A `heroku-postbuild` script handles building the frontend automatically on deploy.

## Authentication Flow

1. User signs up or signs in via `/api/users/signup` or `/api/users/signin`
2. Server returns a JWT token (valid for 30 days)
3. Frontend stores the token in `localStorage` and includes it as `Authorization: Bearer <token>` on protected requests
4. `isAuth` middleware verifies the token; `isAdmin` middleware checks admin status
5. Route guards (`ProtectedRoute`, `AdminRoute`) redirect unauthenticated or unauthorized users to the sign-in page

## Frontend State Management

The app uses React Context with `useReducer` (no Redux). The global store (`Store.js`) manages:

| State Slice       | Description                                         |
| ----------------- | --------------------------------------------------- |
| `userInfo`        | Current user data + JWT (persisted in localStorage) |
| `cart.cartItems`  | Shopping cart items (persisted in localStorage)     |
| `cart.shippingAddress` | Shipping address (persisted in localStorage)   |
| `cart.paymentMethod`   | Selected payment method                        |
| `fullBox`         | Full-screen map toggle                              |

Individual screens manage their own fetch/loading/error state via local `useReducer` hooks.

## Frontend Routes

| Route                   | Component                | Access  |
| ----------------------- | ------------------------ | ------- |
| `/`                     | HomeScreen               | Public  |
| `/product/:slug`        | ProductScreen            | Public  |
| `/cart`                 | CartScreen               | Public  |
| `/search`               | SearchScreen             | Public  |
| `/signin`               | SigninScreen              | Public  |
| `/signup`               | SignupScreen              | Public  |
| `/forget-password`      | ForgetPasswordScreen     | Public  |
| `/reset-password/:token`| ResetPasswordScreen      | Public  |
| `/profile`              | UserProfileScreen        | User    |
| `/map`                  | MapScreen                | User    |
| `/shipping`             | ShippingAddressScreen    | User    |
| `/payment`              | PaymentMethodScreen      | User    |
| `/placeorder`           | PlaceOrderScreen         | User    |
| `/order/:id`            | OrderScreen              | User    |
| `/orderhistory`         | OrderHistoryScreen       | User    |
| `/admin/dashboard`      | DashboardScreen          | Admin   |
| `/admin/products`       | ProductListScreen        | Admin   |
| `/admin/product/:id`    | ProductEditScreen        | Admin   |
| `/admin/orders`         | OrderListScreen          | Admin   |
| `/admin/users`          | UserListScreen           | Admin   |
| `/admin/user/:id`       | UserEditScreen           | Admin   |

## Third-Party Integrations

| Service         | Purpose                                      |
| --------------- | -------------------------------------------- |
| **PayPal**      | Payment processing on order checkout         |
| **Google Maps** | Interactive map for shipping address picker  |
| **Mailgun**     | Transactional email for password reset       |
| **Cloudinary**  | Image hosting (installed, not yet wired in)  |

## License

This project was created as a graduation project.
