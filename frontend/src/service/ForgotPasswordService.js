import axios from "axios";
import {PREFIX} from "../components/Connection";

/*
    Validate the password with given email
 */
const ValidatePassword = async (email) =>
{
    try
    {
        const CHANGE_PASSWORD_REQUEST_URL = `${PREFIX}/change/password?email=${email}`;
        const response = await axios.post(CHANGE_PASSWORD_REQUEST_URL);
        const responseData = response.data.data

        return {
            username: responseData.username,
            user_email: responseData.user_email,
            user_token: responseData.user_token,
            success: true
        };

    }
    catch (error)
    {
        return {
            error,
            success: false
        }
    }
}

/*
    Change Password
 */
export const ChangePassword = async (newPassword, token) =>
{
    try
    {
        const CHANGE_PASSWORD_URL = `${PREFIX}/change/reset-password?token=${token}&&p=${newPassword}`
        await axios.post(CHANGE_PASSWORD_URL);
        return true;
    }
    catch (error)
    {
        return false;
    }
}

/*
    Validate the reset password token
 */
export const ValidateToken = async (token) =>
{
    try
    {
        const FIND_USER_BY_RESET_PASSWORD_TOKEN = `${PREFIX}/auth/find/user/token?token=${token}`
        const response = await axios.get(FIND_USER_BY_RESET_PASSWORD_TOKEN);
        const responseData = response.data.data.token
        return responseData.token === token;
    }
    catch (error)
    {
        return error.response.data.success
    }
}
export default ValidatePassword;
