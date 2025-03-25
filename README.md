# Assignment 12: Multi-Vendor Medicine Selling E-commerce Website

## Project Name: **MediCart**

### **Live Site URL:** (https://assignment-12-solution-client.vercel.app/)
### **Admin Credentials:**
- **Username:** admin@example.com
- **Password:** admin123

---

## **Features of MediCart:**

1. **Responsive Design:** The website is fully responsive for mobile, tablet, and desktop views, including the dashboard.
2. **User Authentication:** Users can sign up, log in, and log out securely with email/password and social login (Google/GitHub).
3. **Dynamic Home Page:**
   - **Navbar:** Includes logo, website name, navigation links, a cart icon, and a profile dropdown (when logged in).
   - **Slider Section:** Displays product advertisements managed by the admin.
   - **Category Cards:** Showcasing categories with basic details and navigation to category-specific medicine pages.
   - **Discount Products:** Draggable slider for medicines with discounts.
   - **Custom Sections:** Two additional sections related to healthcare.
   - **Footer:** A detailed and relevant footer.
4. **Shop Page:**
   - Displays all medicines in a tabular format.
   - Includes a modal for detailed medicine information.
   - Users can add medicines to their cart.
5. **Category Details Page:**
   - Shows all medicines of a specific category in a table.
   - Modal for detailed information.
   - Add-to-cart functionality.
6. **Cart Page:**
   - View, update quantities, remove medicines, and clear the cart.
   - Checkout button for payment.
7. **Checkout & Invoice Page:**
   - Checkout via Stripe for secure payments.
   - Invoice page includes a print/download option.
8. **Admin Dashboard:**
   - Manage Users: Upgrade/downgrade user roles (e.g., user to seller/admin).
   - Manage Categories: Add, update, or delete categories.
   - Payment Management: Approve or track payments.
   - Sales Report: Downloadable reports with filtering.
   - Manage Advertisements: Toggle medicine advertisements on the homepage slider.
9. **Seller Dashboard:**
   - View total sales revenue.
   - Manage Medicines: Add/update medicines with detailed forms.
   - Payment History: Track medicine purchase history.
   - Advertisement Requests: Request medicine advertisements for the homepage slider.
10. **User Dashboard:**
    - Payment History: View transaction details and statuses.
11. **Enhanced Table Features:**
    - Pagination, sorting by price, and search functionality for all medicine tables.
12. **Security:**
    - Environment variables are used to hide Firebase config keys and MongoDB credentials.
    - JWT token stored in local storage for secure API calls and private routes.
13. **Notifications:**
    - Sweet alerts or toast notifications for CRUD operations and authentication events.
14. **Localization:**
    - Optional support for multiple languages (if implemented).
15. **Extras:**
    - Digital clock in the navbar.
    - Data export options for admin reports (PDF/Excel).

---

## **Installation and Setup:**

### 1. **Clone the Repository:**
```bash
https://github.com/your-repo/medi-cart.git
```

### 2. **Navigate to the Project Directory:**
```bash
cd medi-cart
```

### 3. **Install Dependencies:**
#### Client Side:
```bash
cd client
npm install
```
#### Server Side:
```bash
cd server
npm install
```

### 4. **Set Up Environment Variables:**
- **Client:** Create a `.env` file in the `client` directory with the Firebase configuration keys.
- **Server:** Create a `.env` file in the `server` directory with the following:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  STRIPE_SECRET_KEY=your_stripe_secret_key
  ```

### 5. **Run the Application:**
#### Client:
```bash
npm start
```
#### Server:
```bash
npm run dev
```

### 6. **Access the Website:**
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`

---

## **Technology Stack:**

1. **Frontend:** React.js, Tailwind CSS, React Hook Form, SwiperJS
2. **Backend:** Node.js, Express.js
3. **Database:** MongoDB
4. **Authentication:** Firebase (email/password, Google, GitHub)
5. **Payment Gateway:** Stripe
6. **State Management:** Context API
7. **Data Fetching:** React Query (TanStack Query)
8. **Notifications:** React-Toastify


## **Future Enhancements:**
- Translate the website into multiple languages.
- Improve analytics and reporting features.
- Add AI-based recommendations for medicines.
