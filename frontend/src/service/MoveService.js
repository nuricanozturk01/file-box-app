import {PREFIX} from "../components/Connection";
import axios from "axios";

export const MoveFileToAnotherFolder = async (fileId, folderId) =>
{
    try
    {
        const user_id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token')
        const URL = `${PREFIX}/file/move?file_id=${fileId}&&folder_id=${folderId}&&uid=${user_id}`
        const response = await axios.post(URL,{}, {headers: {"Authorization": `Bearer ${token}`}})

        return response.data.data
    }
    catch (error)
    {
        console.log(error)
    }
}
