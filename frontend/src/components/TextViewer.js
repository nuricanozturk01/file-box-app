import React, { useEffect, useState } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/themes/prism.css';

const TextViewer = ({ filePath }) => {
    const [code, setCode] = useState("");

    useEffect(() => {
        fetch(require(`../components/file_box/${filePath.file_path.replace(/\\/g, '/')}`))
            .then(response => response.text())
            .then(data => {
                setCode(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [filePath]);

    const handleChange = newCode => {
        setCode(newCode);
    };

    return (
        <SimpleCodeEditor
            value={code}
            onValueChange={handleChange}
            highlight={newCode => highlight(newCode, languages.markup)}
            padding={10}
            style={{
                overflow: 'auto',
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: '#b2b2b2',
                maxHeight: '700px',
                backgroundColor: "#212121"
            }}
        />
    );
}

export default TextViewer;
