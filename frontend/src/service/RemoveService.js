import axios from "axios";
import {PREFIX} from "../components/Connection";

export const RemoveFileWithFileId = async (fileId) =>
{
    try
    {
        const user_id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token')
        const URL = `${PREFIX}/file/remove?id=${fileId}&&uid=${user_id}`;
        const response = await axios.delete(URL, {headers: {"Authorization": `Bearer ${token}`}})
        return response.data.data
    }
    catch (error)
    {

    }
}

export const RemoveFolderWithFolderId = async (folderId) =>
{
    try
    {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        const URL = `${PREFIX}/folder/remove/dir?id=${folderId}&uid=${user_id}`;
        const response = await axios.delete(URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.data;
    }
    catch (error)
    {
        console.error("An error occurred:", error);
        throw error;
    }
};

export const RemoveMultipleFileByFileIds = async (fileIds) => {
    try
    {
        const user_id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token')
        const URL = `${PREFIX}/file/remove/multiple?uid=${user_id}`;
        const response = await axios.post(URL ,fileIds,{headers: {"Authorization": `Bearer ${token}`}})
        return response.data.data
    }
    catch (error)
    {

    }
}
