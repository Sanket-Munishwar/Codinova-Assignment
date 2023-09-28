const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/user');

const adminModel = require('../models/admin')


// Function to generate JWT token
function generateToken(username) {
  const expiration = Math.floor(Date.now() / 1000) + 3600;
  const token = jwt.sign({ user: username, exp: expiration }, config.secretKey);
  return token;
}

router.post('/createUser', async function(req, res){
  const userdata  = req.body
  const {username, password} = userdata
  if(!username && !password){
    res.send('Please provide username and password')
  }
  const saveUser = await userModel.create(userdata)
  res.status(201).send({ status: true, msg: saveUser });
})

router.post('/createAdmin', async function(req, res){
  const admindata  = req.body
  const {adminname, password} = admindata
  if(!adminname && !password){
    res.send('Please provide adminname and password')
  }
  const saveAdmin = await adminModel.create(admindata)
  res.status(201).send({ status: true, msg: saveAdmin});
})

// User login endpoint
router.post('/authenticate', async function(req, res) {
  try {
    let data = req.body;
    let adminname  = req.body.username;
    let password = req.body.password;
    if (Object.keys(data).length != 0) {

        //======varifing email and password============
        let admin = await adminModel.findOne({ adminname : adminname , password: password });
        if (!admin) {
            return res.status(401).send({ status: false, msg: "adminname  or password is Incorrect or missing." });
        }

        //======after varification get successful token will create==========
        const token = jwt.sign({ adminId: admin._id }, config.secretKey);
        res.header("x-api-key",token);//setting token too the response header

        res.status(201).send({ status: true, data: { "token": token } });

    } else {
        return res.status(400).send({ status: false, msg: "invalid request" });
    }
} catch (err) {
    res.status(500).send({ status: false, msg: err.message });
}
});

module.exports = router;
