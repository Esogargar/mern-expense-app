const User = require('../models/user.model');
const userController = {};
/* 
* Sign up Logic
*/
userController.register = async (req, res, next) => {
    const { name, email, password, joined } = req.body;
    const newUser = new User({
        name,
        email,
        password,
        joined
    });
    try {
        const user = await newUser.save(); //asyn -  we can use .then  .catch but I prefer another way
        return res.send({ user });
    }catch(e){
        if(e.code === 11000 && e.name === 'MangoError'){
            var error = new Error(`Email address ${newUser.emai} is already taken`);
            next(error);
        }else {
            next(e);
        }
    }

};

module.exports = userController;