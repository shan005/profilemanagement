const AdminUser = require('../models/adminanduser')
const jwt = require('jsonwebtoken')
const secret = 'supersecret'

const addAdminUserHimself = async function (req, res) {
    let isValidParams = req.body.email && req.body.password
    let promise = new Promise(async function (resolve, reject) {
        try {
            if (isValidParams) {
                let checkId = await AdminUser.findOne({ email: req.body.email })
                if (checkId) {
                    resolve({ success: false, message: "Email Already Exist" })
                    console.log('user already exist')
                } else {
                    let add = await AdminUser.create({
                        firstname: req.body.firstname,
                        middlename: req.body.middlename,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                        department: req.body.department
                    }).then((admin) => {
                        resolve({ success: true, message: " Signup Successfully" })
                    })
                }
            } else {
                reject({ success: false, message: "Required Params" })
            }
        } catch (error) {
            reject({ success: false, message: "Error Occured While Creating", error: error })
            console.log(error)
        }
    });

    promise.then(function (data) {
        res.send({ success: data.success, message: data.message })
    }).catch(function (error) {
        res.send({ success: error ? error.success : false, message: error ? error.message : 'Error occured while Create Admin User', error: error });

    })
}



const adminuserLogin = async function (req, res) {
    let isValidParams = req.body.email && req.body.password
    let promise = new Promise(async function (resolve, reject) {
        try {
            if (isValidParams) {
                let checkEmail = await AdminUser.findOne({ email: req.body.email })
                if (checkEmail) {
                    if (req.body.password == checkEmail.password) {
                        console.log('valid password');
                        let token = await jwt.sign({ _id: checkEmail._id }, secret, { expiresIn: '30d' })
                        console.log(token);
                        resolve({ success: true, message: 'Login success', token: token })
                    } else {
                        console.log('invalid password');
                        reject({ success: false, message: 'Invalid Password' })
                    }
                } else {
                    reject({ success: false, message: "Invalid EmailId" })
                }
            }
        } catch (error) {
            reject({ success: false, message: "Errror Occured While Creating", error: error })
            console.log(error)
        }
    })

    promise.then(function (data) {
        res.send({ success: data.success, message: data.message, token: data.token })
    }).catch(function (error) {
        res.send({ success: error ? error.success : false, message: error ? error.message : 'Error occured while Login', error: error });
    })

}

const adminAddAdminsUsers = async function (req, res) {
    let isValidParams = req.headers.token
    let promise = new Promise(async function (resolve, reject) {
        try {
            if (isValidParams) {
                let adminId = jwt.verify(req.headers.token, secret)
                console.log('adminId', adminId);
                let checkAdmin = await AdminUser.findOne({ _id: adminId._id })
                console.log('check', checkAdmin);
                if (checkAdmin.role == "admin") {
                    let checkId = await AdminUser.findOne({ email: req.body.email })
                    if (checkId) {
                        resolve({ success: false, message: "Email Already Exist" })
                        console.log('user already exist')
                    } else {
                        let add = await AdminUser.create({
                            firstname: req.body.firstname,
                            middlename: req.body.middlename,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: req.body.password,
                            role: req.body.role,
                            department: req.body.department
                        }).then((add) => {
                            resolve({ success: true, message: "Profile Created Successfully" })
                        })
                    }
                } else {
                    reject({ success: false, message: "You Are Not A Admin" })
                }
            } else {
                reject({ success: false, message: "Required Token" })
            }
        } catch (error) {
            reject({ success: false, message: "Error Occured While Creating", error: error })
            console.log(error)
        }
    });

    promise.then(function (data) {
        res.send({ success: data.success, message: data.message })
    }).catch(function (error) {
        res.send({ success: error ? error.success : false, message: error ? error.message : 'Error occured while Create Admin User', error: error });

    })
}

const updateAdminUserHimself = async function (req, res) {
    let isValidParams = req.headers.token

    let promise = new Promise(async function (resolve, reject) {
        try {
            if (isValidParams) {
                let verifyId = jwt.verify(req.headers.token, secret)
                console.log('verifyId', verifyId);
                let checkId = await AdminUser.findOne({ _id: verifyId._id })
                console.log(verifyId._id);
                if (checkId) {
                    let updateData = await AdminUser.updateOne({ _id: checkId._id }, {
                        $set: {
                            firstname: req.body.firstname,
                            middlename: req.body.middlename,
                            lastname: req.body.lastname,
                            role: req.body.role,
                            department: req.body.department,
                            updatedtime: new Date()
                        }
                    })
                    resolve({ success: true, message: "Edited successfully" })
                } else {
                    reject({ success: false, message: 'customer not found' })
                    console.log('Id Not Found');
                }
            } else {
                reject({ success: false, message: 'required params' })
                console.log('Required Params');
            }
        } catch (error) {
            reject({ success: false, message: 'Error occured while updating ', error: error })
            console.log(error);
        }
    });
    promise.
        then(function (data) {
            console.log('success')
            res.send({ success: data.success, message: data.message });

        }).catch(function (error) {
            console.log('Inside catch', error)
            res.send({ success: error ? error.success : false, message: error ? error.message : 'Error occured while Editing', error: error });
        });
}

const adminUpdateAdminsUsers = async function (req, res) {
    let isValidParams = req.headers.token
    let promise = new Promise(async function (resolve, reject) {
        try {
            if (isValidParams) {
                let adminId = jwt.verify(req.headers.token, secret)
                console.log('adminId', adminId);
                let checkAdmin = await AdminUser.findOne({ _id: adminId._id })
                console.log('check', checkAdmin);
                if (checkAdmin.role == "admin") {
                    let updateData = await AdminUser.updateOne({ email: req.body.email }, {
                        $set: {
                            firstname: req.body.firstname,
                            middlename: req.body.middlename,
                            lastname: req.body.lastname,
                            role: req.body.role,
                            department: req.body.department,
                            updatedtime: new Date()
                        }
                    })
                    resolve({ success: true, message: "Profile Updated Successfully" })
                } else {
                    reject({ success: false, message: "You Are Not A Admin" })
                }

            } else {
                reject({ success: false, message: "Required Token" })
            }
        } catch (error) {
            reject({ success: false, message: "Error Occured While Creating", error: error })
            console.log(error)
        }
    });

    promise.then(function (data) {
        res.send({ success: data.success, message: data.message })
    }).catch(function (error) {
        res.send({ success: error ? error.success : false, message: error ? error.message : 'Error occured while Create Admin User', error: error });

    })
}


const adminUserViewHimself = async function (req, res) {
    let isValidParams = req.headers.token
    let promise = new Promise(async function (resolve, reject) {
        try {
            if (isValidParams) {
                let verifyId = jwt.verify(req.headers.token, secret)
                console.log('Id', verifyId);
                let checkId = await AdminUser.findOne({ _id: verifyId._id })
                console.log(checkId.email);
                if (checkId) {

                    let findEmail = await AdminUser.find({ email: checkId.email })
                    resolve({ success: true, get: findEmail })
                    console.log("fields", findEmail);


                } else {
                    reject({ success: false, message: "Admin Not found" })
                }

            } else {
                reject({ success: false, message: "Required token" })
            }
        } catch (error) {
            reject({ success: false, message: "Error while Getting Profile " })
        }
    });
    promise.
        then(function (data) {
            console.log('success')
            res.send({ success: data.success, get: data.get, getData: data.getData });

        }).catch(function (error) {
            console.log('Inside catch', error)
            res.send({ success: error ? error.success : false, message: error ? error.message : 'Error occured while Editing', error: error });
        });

}


module.exports = {
    addAdminUserHimself,
    adminuserLogin,
    adminAddAdminsUsers,
    updateAdminUserHimself,
    adminUpdateAdminsUsers,
    adminUserViewHimself
}