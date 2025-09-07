import React from "react";
import download_image from '../images/download-svgrepo-com.svg'
import rename_image from '../images/rename-svgrepo-com.svg'
import delete_image from '../images/delete-svgrepo-com.svg'
import copy_image from '../images/copy-2-svgrepo-com.svg'
import cut_image from '../images/cut-svgrepo-com.svg'
import paste_image from '../images/paste-svgrepo-com.svg'
import {MenuItem} from "@react-pdf-viewer/core";

const RightClickComponent = ({download, rename, remove, handleCopyFile, handleCutFile, handlePasteFile, removeMultipleFiles}) =>
{
    return (
        <div style={{backgroundColor: "#272727"}}>
            <MenuItem id="download-right-click-item" onClick={download}>
                <img src={download_image} alt="download" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="download-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Download
                </label>
            </MenuItem>

            <MenuItem id="copy-right-click-item" onClick={handleCopyFile}>
                <img src={copy_image} alt="delete" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="copy-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Copy
                </label>
            </MenuItem>

            <MenuItem id="cut-right-click-item" onClick={handleCutFile}>
                <img src={cut_image} alt="delete" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="cut-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Cut
                </label>
            </MenuItem>

            <MenuItem id="paste-right-click-item" onClick={handlePasteFile}>
                <img src={paste_image} alt="delete" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="paste-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Paste
                </label>
            </MenuItem>

            <MenuItem id="rename-right-click-item" onClick={rename}>
                <img src={rename_image} alt="rename" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="rename-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Rename
                </label>
            </MenuItem>

            <MenuItem id="remove-right-click-item" onClick={remove}>
                <img src={delete_image} alt="delete" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="remove-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Remove
                </label>
            </MenuItem>


            <MenuItem id="remove-multiple-right-click-item" onClick={removeMultipleFiles}>
                <img src={delete_image} alt="delete" width="20px" height="25px" style={{marginRight: "3px"}}/>
                <label id="remove-multiple-right-click-item-button" style={{color: "#b2b2b2"}}>
                    Remove Selected Files
                </label>
            </MenuItem>
        </div>
    );
}
export default RightClickComponent
