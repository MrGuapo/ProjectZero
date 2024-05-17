import {signupAuth, loginAuth} from "../middlewares/auth.js";
import {createToken, createRefreshToken} from '../middlewares/jwt.js';

export const signup = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const user = await signupAuth(username, email, password);

        // create access token
        const accessToken = createToken(user);

        // create refresh token
        const refreshToken = createRefreshToken(user);

        // store tokens in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await loginAuth(username, password);

        // create access token
        const accessToken = createToken(user);

        // create refresh token
        const refreshToken = createRefreshToken(user);

        // store tokens in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'User logged out.'});
}