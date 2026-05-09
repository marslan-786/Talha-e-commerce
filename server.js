const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_uri_here";
mongoose.connect(MONGODB_URI).then(() => console.log("VIP Database Connected ✅"));

const productSchema = new mongoose.Schema({
    title: String, description: String, price: Number, imageUrl: String, category: String
});
const Product = mongoose.model('Product', productSchema);

// --- CLEAN ROUTES ---
app.get('/talha', (req, res) => res.sendFile(path.join(__dirname, 'public/admin-login.html')));
app.get('/talha/products', (req, res) => res.sendFile(path.join(__dirname, 'public/admin-products.html')));
app.get('/talha/add-products', (req, res) => res.sendFile(path.join(__dirname, 'public/admin-add.html')));

// --- API ---
app.post('/api/login', (req, res) => {
    if (req.body.accessKey === "talha12") res.json({ success: true });
    else res.status(401).json({ success: false });
});

app.get('/api/get-products', async (req, res) => res.json(await Product.find().sort({_id: -1})));

app.post('/api/add-product', async (req, res) => {
    await new Product(req.body).save();
    res.json({ success: true });
});

app.delete('/api/delete-product/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
