import React, {useContext, useEffect, useState} from "react";
import Navbar from "./Navbar";
import OptionsNavBar from "./OptionsNavBar";
import TableComponent from "./TableComponent";
import DragDrop from "./DragDrop";
import ProgressBarComponent from "./ProgressBarComponent";
import GridComponent from "./GridComponent";
import {Context} from "../Context/ContextProvider";
import {ViewStatus} from "../ViewStatus";



const MainPage = () =>
{
    const context = useContext(Context)
    const [folder, setFolder] = useState(null)
    const handleFolderClick = async (folderId) =>
    {
        setFolder(folderId)
    };
    useEffect(() => {
        localStorage.setItem("view", context.mainView)
    }, [context.mainView]);
    return (
        <div className="grid" style={{backgroundColor: "#1c1c1c", height: "100v", width: "100v"}}>
            <Navbar/>
            <div className="container" style={{padding: "0 0px"}} >
                <div className="row column-gap-12 row-cols-0 row-gap-5 row-cols-md-12 row-cols-lg-12">
                    <DragDrop/>
                    <ProgressBarComponent/>
                    <OptionsNavBar handleFolderClick={handleFolderClick}/>

                    {context.mainView === ViewStatus.TABLE && <TableComponent navigateId={folder}/>}
                    {context.mainView === ViewStatus.GRID && <GridComponent navigateId={folder}/>}
                </div>
            </div>
        </div>
    )

}

export default MainPage;
