import axios from "axios";
import {PREFIX} from "../components/Connection";

export const SortFilesByFileSize = async folderId =>
{

    try
    {
        const user_id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token')

        const URL = `${PREFIX}/file/sort/byte?fid=${folderId}&&uid=${user_id}`

        const response = await axios.get(URL, {headers: {"Authorization": `Bearer ${token}`}})

        return response.data.data
    }
    catch (error)
    {
        console.log(error)
    }
}
export const SortFilesByCreationDate = async folderId =>
{
    try
    {
        const user_id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token')
        const URL = `${PREFIX}/file/sort/date/creation?fid=${folderId}&&uid=${user_id}`

        const response = await axios.get(URL, {headers: {"Authorization": `Bearer ${token}`}})
        return response.data.data

    }
    catch (error)
    {
        console.log(error)
    }
}

export const FilterFilesByFileExtension = async (folderId, extension) =>
{
    try
    {
        const user_id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token')

        const URL = `${PREFIX}/file/find/all/extension?fid=${folderId}&&ext=${extension}&uid=${user_id}`

        const response = await axios.get(URL, {headers: {"Authorization": `Bearer ${token}`}})

        return response.data.data

    }
    catch (error)
    {
        console.log(error)
    }
}
