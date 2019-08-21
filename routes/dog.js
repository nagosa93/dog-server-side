const express = require("express");
const router = express.Router();
const dogsModels = require('../models/dog')

router.get("/allDogs", (req, res) => {

    dogsModels.allDogs()
        .then((dog) => {
            return res.status(200).json({ success: dog })
        })
        .catch((err) => {
            return res.status(202).json({ err: err })
        })
})
router.post("/adoptedDog", (req, res) => {
    console.log(req.body);
    

    dogsModels.adoptedDog(req.body)
        .then((dog) => {
            return res.status(200).json({ success: dog })
        })
        .catch((err) => {
            return res.status(202).json({ err: err })
        })
})











module.exports = router;
