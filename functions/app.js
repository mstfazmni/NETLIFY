const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const cors = require('cors');
router.use(cors({
    origin: ['*', 'https://mstfazmni.github.io']
  }));

router.options('*', cors());

router.get("/", (req, res) => {
    res.send("App is running..");
});


router.post('/register', (req, res) => {
    const { firstName, lastName, userId, address, status } = req.body;
    
    let fee;
    switch (status) {
        case 'student':
            fee = 10;
            break;
        case 'staff':
            fee = 50;
            break;
        case 'volunteer':
            fee = 0;
            break;
        default:
            fee = 0;
    }
    
    const response = {
        firstName: firstName,
        lastName: lastName,
        userId: userId,
        address: address,
        status: status,
        fee: fee
    };
    
    res.json(response);

    res.send("Post running ...");
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
