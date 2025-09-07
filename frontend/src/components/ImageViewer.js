import React from "react";

const ImageViewer = ({filePath}) =>
{
    return (
        <div>
            <img src={require('../components/file_box/' + filePath.file_path.replace(/\\/g, '/'))}
                 alt="picture"/>
        </div>
    );
}

export default ImageViewer;
