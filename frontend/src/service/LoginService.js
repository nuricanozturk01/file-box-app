import axios from 'axios'
import {wait} from "@testing-library/user-event/dist/utils";
import {PREFIX} from "../components/Connection";


const LOGIN_URL = `${PREFIX}/auth/login/user`

const ValidateUser = async (userInput) =>
{
    try
    {

        const UserLoginDto = {
            username: userInput.username,
            password: userInput.password,
        };

        const response = await axios.post(LOGIN_URL, UserLoginDto);
        await wait(20)
        const responseData = response.data.data


        return {
            username: responseData.username,
            token: responseData.token,
            user_id: responseData.user_id,
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

export default ValidateUser;
