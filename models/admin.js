const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminId: {
    type: String,
    min: 9,
    max: 9,
    require: true
  },
  adminPassword: {
    type: String,
    min: 8,
    max: 10,
    require: true
  },
  adminUser: {
    type: String,
    min: 4,
    max: 10,
    require: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
const adminTable = mongoose.model("admin", adminSchema);

createAdmin = (adminObj) => {

  let p = new Promise((resolve, reject) => {
    adminTable.findOne({ adminId: adminObj.adminId })
      .then((admin) => {
        if (admin) return reject("Admin exsist");
        let newAdmin = adminTable({
          adminId: adminObj.adminId,
          adminUser: adminObj.adminUser,
          adminPassword: adminObj.adminPassword
        });
        newAdmin.save();
        return resolve(newAdmin);
      });
  });
  return p;
};



loginAdmin = (data) => {
  let p = new Promise((resolve, reject) => {
    adminTable.findOne({ adminUser: data.adminUser, adminPassword: data.adminPassword })
      .then((adminData) => {
        if (adminData) {
          return resolve({
            adminUser: adminData.adminUser
          })
        }
        return reject('Incorrect  user or password')
      })
      .catch((err) => {
        return reject({ err: err })
      })
  })
  return p;

}


module.exports = {
  loginAdmin: loginAdmin,
  createAdmin: createAdmin
}