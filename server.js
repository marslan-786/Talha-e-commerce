const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public')); // ہماری HTML فائلز 'public' فولڈر میں ہوں گی

// لاگ ان API روٹ
app.post('/api/login', (req, res) => {
    const { accessKey } = req.body;
    const SECRET_KEY = "talha12"; // تمہارا ہارڈ کوڈڈ پاسورڈ

    if (accessKey === SECRET_KEY) {
        res.status(200).json({ success: true, message: "Access Granted!" });
    } else {
        res.status(401).json({ success: false, message: "Invalid Access Key!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
