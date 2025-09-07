import React, {useEffect, useState} from "react";
import {Viewer, Worker} from "@react-pdf-viewer/core";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";


const PdfViewer = (viewFile) =>
{

    const [pdfFile, setPdfFile] = useState();

    useEffect(() =>
    {
        const load = async () =>
        {
            try
            {
                const realPath = viewFile.file.file_path.replace(/\\/g, '/');
                setPdfFile(realPath);
            }
            catch (error)
            {
                console.error("Error while setting pdfFile:", error);
            }
        };
        load();

    }, [viewFile.file.file_path]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className="pdf-viewer">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@latest/build/pdf.worker.min.js">
                <div
                    style={{
                        height: "900px",
                        width: "950px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                    {pdfFile && (
                        <Viewer
                            fileUrl={require('../components/file_box/' + pdfFile)}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    )}
                </div>
            </Worker>
        </div>
    );
};
export default PdfViewer;
