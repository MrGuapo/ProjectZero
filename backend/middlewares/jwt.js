import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// create access token
export const createToken = (user) => {
    return jwt.sign({_id: user._id, username: user.username}, process.env.JWT_ACCESS, {expiresIn: '5m'});
}

// create refresh token
export const createRefreshToken = (user) => {
    return jwt.sign({_id: user._id, username: user.username}, process.env.JWT_REFRESH, {expiresIn: '3d'});
}

// authenticate access token
export function authenticateToken(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (accessToken == null) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.JWT_ACCESS, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// authenticate refresh token
export function authenticateRefreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = createToken(user);

        // Set the new access token in a HTTP-only cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        res.sendStatus(200);
    });
}