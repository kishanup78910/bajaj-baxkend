const express = require('express');
const bodyParser = require('body-parser');
const atob = require('atob');
const cors = require('cors'); 

const app = express();

app.use(bodyParser.json());

app.use(cors());


app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    const numbers = [];
    const alphabets = [];
    let highest_lowercase = '';
    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (isNaN(item) && typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highest_lowercase) {
                highest_lowercase = item;
            }
        }
    });

  
    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            file_size_kb = (buffer.length / 1024).toFixed(2);  
            file_mime_type = 'application/octet-stream';
            file_valid = true;  
        } catch (err) {
            file_valid = false;
        }
    }

 
    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : [],
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});