const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection (Railway Environment Variable)
const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";
mongoose.connect(MONGODB_URI).then(() => console.log("MongoDB Connected"));

// Product Schema
const productSchema = new mongoose.Schema({
    title: String, description: String, price: Number, imageUrl: String, category: String
});
const Product = mongoose.model('Product', productSchema);

// --- ROUTES ---

// 1. Admin Login Page (myweb.com/talha)
app.get('/talha', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-login.html'));
});

// 2. Manage Products (myweb.com/talha/products)
app.get('/talha/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-products.html'));
});

// 3. Add Products (myweb.com/talha/add-products)
app.get('/talha/add-products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-add.html'));
});

// --- API ENDPOINTS ---

app.post('/api/login', (req, res) => {
    if (req.body.accessKey === "talha12") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

app.get('/api/get-products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/add-product', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ success: true });
});

app.delete('/api/delete-product/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
