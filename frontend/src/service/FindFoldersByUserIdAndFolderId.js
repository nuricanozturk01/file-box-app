import axios from "axios";
import {PREFIX} from "../components/Connection";


/*
    Find files with given folder id
 */
export const FindFilesOnFolder = async (folderId) =>
{

    try
    {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem('token');

        const findFilesOnFolderUrl = `${PREFIX}/file/find/all/folder?fid=${folderId}&&uid=${userId}`
        const response = await axios.get(findFilesOnFolderUrl, {headers: {"Authorization": `Bearer ${token}`}});

        return response.data.data.files
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
    }
}


/*
    Find Folder with given user id and parent folder id
 */
export const FindFoldersByUserIdAndFolderId = async (folderId) =>
{
    try
    {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        const URL = `${PREFIX}/folder/find/all/folder?fid=${folderId}&&id=${user_id}`;
        const response = await axios.get(URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.data;
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
    }
}


/*
    Find Root Folder current User
 */
export const FindRootFolderByUserId = async () =>
{
    try
    {
        const user_id = localStorage.getItem('user_id');
        const URL = `${PREFIX}/folder/find/root/uuid?uid=${user_id}`;
        const response = await axios.get(URL);
        return response.data.data;
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
    }
}


export const FindFolderByFolderId = async (folderId) =>
{
    try
    {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        const URL = `${PREFIX}/folder/find/folder?id=${user_id}&&fid=${folderId}`;
        const response = await axios.get(URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.data.folder;
    }
    catch (error)
    {
        console.log(error)
    }
}
