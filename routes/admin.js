const express = require("express");
const router = express.Router();
const adminModel = require('../models/admin');
const dogModel = require('../models/dog');
const userModel = require('../models/user');


router.get('/allUser', (req, res) => {
    userModel.allData()
        .then((data) => {
            return res.status(200).json({ success: data });
        })
        .catch((err) => {
            return res.status(202).json({ err: err });
        });
});

router.post('/addDog', (req, res) => {
    let dogObj = {
        id: req.body.id,
        dogName: req.body.dogName,
        gender: req.body.gender,
        image: req.body.image,
        size: req.body.size,
        graduation: req.body.graduation
    }
    dogModel.addDog(dogObj)
        .then((dogs) => {
            return res.status(200).json({ success: dogs });
        })
        .catch((err) => {
            return res.status(202).json({ err: err });
        });
});

router.post('/deleteDog', (req, res) => {
    dogModel.removeDog(req.body)
        .then((dog) => {
            return res.status(200).json({ success: dog });
        })
        .catch((err) => {
            return res.status(202).json({ error: err })
        });
})

router.post('/login', (req, res) => {
    adminModel.loginAdmin(req.body)
        .then((adminData) => {
            console.log(adminData);

            return res.status(200).json({ success: adminData })
        })
        .catch((err) => {
            return res.status(202).json({ error: err })
        });
})

router.post('/creatAdmin', (req, res) => {
    let adminObj = {
        adminId: req.body.adminId,
        adminUser: req.body.adminUser,
        adminPassword: req.body.adminPassword
    }
    adminModel.createAdmin(adminObj)
        .then((admin) => {
            return res.status(200).json({ success: admin })
        })
        .catch((err) => {
            return res.status(202).json({ error: err })
        })
})



module.exports = router;