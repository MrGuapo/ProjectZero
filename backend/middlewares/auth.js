import user from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";

const auth = {
    signup: async (username, email, password) => {
        // validate fields
        if (!username || !email || !password) {
            throw new Error('All fields are required.');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email.');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Weak password.\n' +
                'Minimum length of 8 characters.\n' +
                'At least one uppercase letter.\n' +
                'At least one lowercase letter.\n' +
                'At least one digit.\n' +
                'At least one symbol.');
        }

        // check if email exists
        const exists = await user.findOne({email});
        if (exists) {
            throw new Error('This email is already in use.');
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        return await user.create({username, email, password: hash});
    },
    login: async (username, password) => {
        // validate fields
        if (!username || !password) {
            throw new Error('All fields are required.');
        }

        // check username
        const foundUser = await user.findOne({username});
        if (!foundUser) {
            throw new Error('Incorrect username.');
        }

        // check password
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            throw new Error('Incorrect password.');
        }

        return foundUser;
    }
}

export default auth;