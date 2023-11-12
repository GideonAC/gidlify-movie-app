"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
/*============================ EJS FRAMEWORK===============================*/
///////////////////////////// REGISTER ///////////////////////////////////
const Register = async (req, res) => {
    try {
        console.log('from reg', req.body);
        const { fullname, username, email, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //validate with zod or joi
        const validateResult = utils_1.registerUserSchema.validate(req.body, utils_1.option);
        //console.log(validateResult.error)
        if (validateResult.error) {
            console.log(validateResult.error);
            return res.render("SignUp", { error: validateResult.error.details[0].message });
        }
        //Generate salt for password hash
        const passwordHash = await bcryptjs_1.default.hash(password, await bcryptjs_1.default.genSalt());
        console.log('after', req.body);
        //check if user exist before creating a newuser
        const emailExists = await userModel_1.UserInstance.findOne({ where: { email: validateResult.value.email } });
        const usernameExists = await userModel_1.UserInstance.findOne({ where: { username: validateResult.value.username } });
        if (!emailExists && !usernameExists) {
            const newuser = await userModel_1.UserInstance.create({
                id: iduuid,
                fullname,
                username: validateResult.value.username,
                email: validateResult.value.email,
                password: passwordHash,
            });
            return res.redirect('/login');
        }
        if (emailExists) {
            return res.render("SignUp", { error: "Email already exists, please login" });
        }
        // }
        if (usernameExists) {
            return res.render("Login", { error: "Username already exists, try a different Username" });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
///////////////////////////// LOGIN ///////////////////////////////////
const Login = async (req, res) => {
    const { email, username, password } = req.body;
    const iduuid = (0, uuid_1.v4)();
    //validate with zod or joi
    const validateResult = utils_1.loginUserSchema.validate(req.body, utils_1.option);
    if (validateResult.error) {
        return res.render('Login', { error: validateResult.error.details[0].message });
    }
    console.log(validateResult);
    //Check the User exist using the email before generating token
    const User = await userModel_1.UserInstance.findOne({
        where: { email },
    });
    //Invalid email error message
    if (!User) {
        // const UserUsername = (await UserInstance.findOne({
        //   where: { username: validateResult.value.email },
        // })) as unknown as { [key: string]: string };
        //If the email does'nt validate, check using Username
        //NOTE: my code validates User login using email or username and password
        return res.render("Login", { error: "Invalid email/password" });
    }
    const { id, fullname } = User;
    // Generate a token for the user
    const token = jsonwebtoken_1.default.sign({ id, fullname }, jwtsecret, { expiresIn: "30d" });
    // Save token in the cookies, 3600000 means 1hr & httpOnly means cookies is accessible only via https
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
    // To validate a user by comparing user password and the one the user is inputing for login
    const validUser = await bcryptjs_1.default.compare(password, User.password);
    if (validUser) {
        return res.redirect('/my-dashboard');
        // return res.status(201).json({ msg: "User login successful", User, token });
    }
    return res.render("Login", { error: "Invalid email/password" });
};
exports.Login = Login;
//this condition is for "if the email is valid"
//   const { id } = User;
//   const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });
//   const validUser = await bcrypt.compare(password, User.password);
//   if (validUser) {
//     return res.status(201).json({msg: "User login successful", User, token });
//   }
//   res.status(400).json({ error: "Invalid email/password"});
// };
/* ========================================= ANY OTHER FRONT END FRAMEWORK ======================================*/
// export const Register = async (req: Request, res: Response) => {
//     try {
//         const { email, firstName, password, confirm_password } = req.body
//         const iduuid = uuidv4()
//         //validate with zod or joi
//         const validateResult = registerUserSchema.validate(req.body, option);
//         //console.log(validateResult.error)
//         if (validateResult.error) {
//             return res.render('Register', {error: validateResult.error.details[0].message})
//         }
//         //Generate salt for password hash
//         const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt())
//         //check if user exist before creating a newuser
//         const user = await UserInstance.findOne({
//             where: { email: email }
//         });
//         if (!user) {
//             const newuser = await UserInstance.create({
//                 id: iduuid,
//                 email,
//                 firstName,
//                 password: passwordHash
//             })
//             return res.redirect('/login')
//         }
//         //return res.status(400).json({ error: "Email already exist" });
//         return res.render("Register", {error: "Email already exist"})
//     } catch (err) {
//         console.log(err)
//     }
// };
// export const Login = async (req: Request, res: Response) => {
//     const { email, password } = req.body
//     const iduuid = uuidv4()
//     //validate with zod or joi
//     const validateResult = loginUserSchema.validate(req.body, option);
//     //console.log(validateResult.error)
//     if (validateResult.error) {
//         return res.render("Register", {
//             error: validateResult.error.details[0].message
//         })
//     }
//     //Get the user info before generating token
//     const User = await UserInstance.findOne({
//         where: { email: email }
//     }) as unknown as { [key: string]: string };
//     //Invalid email error message
//     if (!User){
//         return res.status(404).json({
//             Error: "Invalid mail/password"
//         });
//     }
//     //console.log(User)
//     const { id } = User
//     // Generate a token for the user
//     const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });
//     // To validate a user by comparing user password and the one the user is inputing for login
//     const validUser = await bcrypt.compare(password, User.password)
//     if (validUser) {
//         return res.status(201).json({
//             msg: "User login successful",
//             User,
//             token
//         })
//     }
//     res.status(400).json({
//         error: "Invalid email/password"
//     })
// }
