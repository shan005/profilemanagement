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

module.exports = {
    addAdminUserHimself,
    adminuserLogin,
    adminAddAdminsUsers
}