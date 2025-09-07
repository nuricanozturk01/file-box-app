import React, {useEffect} from "react";
import RenameFile from "./RenameFile";
import RenameFolder from "./RenameFolder";
import CreateNewFolder from "./CreateNewFolder";

const PopupRename = ({isFile, isFolder, onClose, renameFile, renameFolder, isNewFolder}) =>
{

    useEffect(() =>
    {
        const handleKeyDown = (event) =>
        {
            if (event.keyCode === 0x1B) //esc
                onClose();
        };

        document.addEventListener('keydown', handleKeyDown);

        return () =>
        {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay">
            {isNewFolder && <CreateNewFolder/>}
            {isFile && renameFile !== undefined && renameFile !== null && <RenameFile file={renameFile}/>}
            {isFolder && renameFolder !== undefined && renameFolder !== null && <RenameFolder folder={renameFolder}/>}

            <div className="modal">

            </div>
        </div>
    );
}
export default PopupRename;
