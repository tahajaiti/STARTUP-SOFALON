# SOFALON Website Showcase

Welcome to SOFALON website project! This website was created to allow users to browse, filter, and purchase products in a visually appealing and responsive interface. Administrators can manage the product catalog and view performance metrics, while users can browse products, manage their cart, and complete purchases.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Project Overview
This project simulates an e-commerce website for a startup aiming to promote and sell its products. Developed by a team over 7 business days, the website provides features for both administrators and users, creating a seamless shopping experience. Administrators can add, edit, and remove products, while users can filter and sort products, view detailed product pages with photo galleries, add items to a cart, and receive downloadable PDF summaries of their orders.

## Features

### User Features
- **Product Browsing**: View a carousel showcasing featured products on the homepage.
- **Product Filtering and Sorting**: Filter products by category and search by name, and sort by price or name (ascending/descending).
- **Product Pagination**: Navigate through paginated product listings.
- **Product Detail**: View detailed product pages, including photo galleries.
- **Shopping Cart**: Add products to a cart and view the total price.
- **Order Summary**: Upon checkout, receive a downloadable PDF summarizing selected products, their prices, and the total amount.

### Administrator Features
- **Product Management**: Add, edit, and delete products in the catalog.
- **Dashboard** (Bonus): Access a dashboard with KPIs for products and sales.
- **Admin Authentication** (Bonus): Secure the admin dashboard with authentication.

### Additional Features
- **User Profile** (Bonus): Users can view purchase history.
- **Responsive Design**: Optimized for various screen sizes.
- **Accessibility & SEO**: Site is optimized for accessibility and search engines.
- **Data Persistence**: Product and cart data are stored in JSON and Local Storage.
- **JS Animations**: Includes animations for an enhanced user experience.
  
## Technologies Used
- **Frontend Framework**: Tailwind CSS for styling
- **JavaScript**: For interactivity, including carousel and form validation
- **HTML/CSS**: Structure and additional styling
- **Local Storage**: To store persistent data on the client side
- **JSON**: To hold initial data for products
- **Libraries**:
  - **PDF.js**: For generating downloadable PDF order summaries
  - **anime.js**: For implementing animations
  - **Regex**: For input validation

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Youcode-Classe-E-2024-2025/DOTEXE_STARTUP2
    cd DOTEXE_STARTUP2
    ```

2. **Install Dependencies**:
    - No additional dependencies are required for this static website.

3. **Run the Project**:
    - Open `index.html` in your browser to view the site locally.

## Usage

- **Admin Access**: Use the admin dashboard to manage products and view site metrics.
- **Product Interaction**: Browse and interact with the product list, filter by category, search by name, and sort by price or name.
- **Checkout Process**: Add products to the cart, proceed to checkout, and download an order summary as a PDF.

## License

- **MIT License**: This project is open-source and available under the MIT License..