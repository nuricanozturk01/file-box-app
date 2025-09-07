import React, {useEffect, useState} from "react";
import PdfViewer from "./PdfViewer";
import './PopupComponent.css'
import TextViewer from "./TextViewer";
import ImageViewer from "./ImageViewer";
import VideoPlayer from "./VideoPlayer";
import Mp3Player from "./Mp3Player";

const PopupComponent = ({viewFile, onClose}) =>
{

    const [file, setFile] = useState([])
    const [isPdf, setIsPdf] = useState()
    const [isText, setIsText] = useState()
    const [isImage, setIsImage] = useState()
    const [isVideo, setIsVideo] = useState()
    const [isMusic, setIsMusic] = useState()
    const [unDefinedType, setUndefinedType] = useState([])

    const setFileType = (file_type) =>
    {

        if (file_type === ".pdf")
            setIsPdf(true)
        else if ([".txt", ".java", ".css", ".cs", ".sh", ".c"].includes(file_type))
            setIsText(true)
        else if ([".jpg", ".png", ".svg"].includes(file_type))
            setIsImage(true)
        else if ([".mp4", ".m4v"].includes(file_type))
            setIsVideo(true)
        else if ([".mp3"].includes(file_type))
            setIsMusic(true)
        else setUndefinedType(true)
    };

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
    useEffect(() =>
    {
        setUndefinedType(false)
        setIsPdf(false)
        setIsText(false)
        setIsVideo(false)
        setIsMusic(false)
        setIsImage(false)
        const load = async () =>
        {
            try
            {
                setFile(viewFile);
            } catch (error)
            {
                console.error("Error while setting pdfFile:", error);
            }
        };
        load();
        setFileType(file.file_type)
    }, [file, viewFile, viewFile.file]);


    return (
        <div className="modal-overlay">

            {isPdf && <PdfViewer file={viewFile}/>}
            {isText && <TextViewer filePath={viewFile}/>}
            {isImage && <ImageViewer filePath={viewFile}/>}
            {isVideo && <VideoPlayer filePath={viewFile}/>}
            {isMusic && <Mp3Player filePath={viewFile}/>}

            {unDefinedType && <h2 style={{color: "#b2b2b2"}}>Undefined file type!</h2>}

            <button onClick={onClose}
                    className="btn btn-primary w-10 py-2 close-button"
                    style={{
                        backgroundColor: "#272727",
                        color: "#B2B2B2",
                        borderColor: "#808080"
                    }}
                    type="submit"> Close
            </button>
            <div className="modal">

            </div>
        </div>
    );
}

export default PopupComponent;
