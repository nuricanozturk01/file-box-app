import React from "react";

const VideoPlayer = ({filePath}) =>
{
    return (
        <div>
            <video controls width="800" height="600">
                <source src={require('../components/file_box/' + filePath.file_path.replace(/\\/g, '/'))}
                        type="video/mp4"/>
            </video>
        </div>
    );
}

export default VideoPlayer;
