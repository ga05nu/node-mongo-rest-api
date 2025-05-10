# Node.js + MongoDB RESTful Web Service

This is a simple RESTful Web Service built using **Node.js** and **MongoDB** for managing a `Person` collection.

## 📦 Person Fields
- **Name** (String)
- **Age** (Number)
- **Gender** (String)
- **Mobile Number** (String)

---

## 🚀 Endpoints

### `GET /person`
- Displays a table listing all people from the database.

### `POST /person`
- Shows a form to create a new person.
- Submitting the form adds the person to the MongoDB collection.

### `PUT /person/:id`
- Displays a form to edit an existing person's details by ID.
- Updates the document in MongoDB.

### `DELETE /person/:id`
- Shows a confirmation page to delete a person by ID.
- Deletes the person from MongoDB.

---

## 🛠 Tech Stack
- **Node.js** (Backend)
- **Express.js** (Web framework)
- **MongoDB** with **Mongoose** (Database & ODM)
- **EJS / HTML** for templating (if applicable)

---
