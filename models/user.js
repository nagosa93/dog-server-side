const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const userTable = mongoose.model('users', userSchema);

addDeatails = (userObj) => {

    let p = new Promise((resolve, reject) => {
        userTable.findOne({ email: userObj.email })
            .then((data) => {
                if (data) return reject("email Exsist ");
                let newUser = userTable({
                    name: userObj.name,
                    email: userObj.email,
                    phone: userObj.phone
                });
                newUser.save();
                return resolve("will contact you soon ");
            });
    });
    return p;
};


allData = () => {
    let p = new Promise((resolve, reject) => {
        userTable.find({})
            .then((data) => {
                if (data) return reject("No data ");
                return resolve(data);
            });
    });
    return p;
};
  



module.exports = {
    addDeatails: addDeatails,
    allData: allData
}