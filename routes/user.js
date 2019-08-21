const express = require("express");
const router = express.Router();
const userModel = require('../models/user');


router.post('/add', (req, res) => {

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    userModel.addDeatails(newUser)
        .then((data) => {
            return res.status(200).json({ success: data })
        })

        .catch((err) => {
            return res.status(202).json({ error: err })
        })
})


module.exports = router;