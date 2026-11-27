<!-- PORTFOLIO_OVERVIEW_START -->
React E-Commerce is a browser-based storefront for discovering products and managing authenticated carts, customer profiles, and orders through a REST API. Built as a Vite-powered React single-page application, it uses React Router for navigation and Redux Toolkit with React Redux to coordinate asynchronous product, user, cart, and order state.
<!-- PORTFOLIO_OVERVIEW_END -->

<!-- PORTFOLIO_HIGHLIGHTS_START -->
- **Highlight 1:** Implements product browsing with category and brand data, filtering, and individual product views.
- **Highlight 2:** Organizes product, authentication, cart, and order workflows into Redux Toolkit slices backed by REST API modules; protected routes require an authenticated user.
- **Highlight 3:** Provides Vite development, production-build, preview, and ESLint commands through npm scripts.
<!-- PORTFOLIO_HIGHLIGHTS_END -->

# React E-Commerce

A React storefront for product discovery, shopping-cart management, and order placement.

## Tech Stack

- **React 19** and **React DOM** for the user interface
- **Vite** and `@vitejs/plugin-react` for development and production builds
- **React Router** for client-side routing
- **Redux Toolkit** and **React Redux** for application state
- **Tailwind CSS 4** with the Vite plugin for styling
- **React Hook Form** for form handling
- **Leaflet** and **React Leaflet** are dependencies; the app imports Leaflet styles

## Architecture / Key Features

The application entry point mounts the React app with the Redux store, and the router defines storefront, product, authentication, cart, profile, checkout, and order pages. State and API logic are grouped by feature under `src/Features/`, with separate slices for users, products, cart contents, and orders.

The storefront supports product listings, category and brand data, product filtering, and product detail views. Account flows include sign-up, sign-in, session restoration from a locally stored token, and protected routes. Signed-in users can manage a cart, maintain shipping addresses, choose cash or card as an order payment method, and view order-related pages.

The backend is not included in this repository. API modules make requests to `http://localhost:8080`; the product-filter thunk in `src/Features/ProductList/productListSlice.js` instead requests `http://localhost:3000/products`. Backend-dependent functionality therefore requires compatible API services at the endpoints used by the relevant flows. The checkout UI records a selected payment method; no payment-processing integration is present in this repository.

## Local Setup & Run Instructions

From the repository root, install the locked dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

The development server prints the local URL in the terminal. The frontend can be built, linted, or previewed using the scripts defined in `package.json`:

```sh
npm run build
npm run lint
npm run preview
```

`npm run preview` serves the production build locally, so run `npm run build` first. The repository does not include a backend start script; provide the API services described above separately to exercise API-backed features.
