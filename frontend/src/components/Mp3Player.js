import React from "react";

const Mp3Player = ({filePath}) =>
{
    return (
        <div>
            <audio controls>
                <source src={require('../components/file_box/' + filePath.file_path.replace(/\\/g, '/'))}
                        type="audio/mpeg"/>
            </audio>
        </div>
    );
}

export default Mp3Player;
