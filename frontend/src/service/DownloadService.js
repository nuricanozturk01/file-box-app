import axios from "axios";
import {PREFIX} from "../components/Connection";

export const DownloadFile = async (file, callback) =>
{
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const URL = `${PREFIX}/download/file?fid=${file.file_id}&uid=${user_id}`;

    return axios.get(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => callback(Math.round((progressEvent.loaded / progressEvent.total) * 100))
    })
        .then(response =>
        {
            const blob = new Blob([response.data], {type: 'application/octet-stream'});

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', `${file.file_name}`);

            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error =>
        {
            throw error
        })
}


export const DownloadFolder = async (folder, callback) =>
{
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const URL = `${PREFIX}/download/folder?fid=${folder.folderId}&&uid=${user_id}`

    return axios.get(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => callback(Math.round((progressEvent.loaded / progressEvent.total) * 100))
    })
        .then(response =>
        {
            const blob = new Blob([response.data], {type: 'application/zip'});

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', `${folder.folderName}`);

            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error =>
        {
            throw error
        })

}
