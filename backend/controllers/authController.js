import auth from "../middlewares/auth.js";

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const user = await auth.signup(username, email, password);

        // // create access token
        // const accessToken = auth.createAccessToken(user);
        //
        // // create refresh token
        // const refreshToken = auth.createRefreshToken(user);
        //
        // // store tokens in cookies
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'strict',
        // });
        //
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'strict'
        // });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await auth.login(username, password);

        // // create access token
        // const accessToken = auth.createAccessToken(user);
        //
        // // create refresh token
        // const refreshToken = auth.createRefreshToken(user);
        //
        // // store tokens in cookies
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'strict',
        // });
        //
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'strict'
        // });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export default {
    signup, login
};