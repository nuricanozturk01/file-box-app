import {useContext, useEffect} from "react";
import {Col, Row, Toast, ToastContainer} from "react-bootstrap";
import {Context} from "../Context/ContextProvider";

const ToastMessage = ({message, title, rightSideMessage}) =>
{
    const context = useContext(Context)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() =>
    {
        if (context.showAlert)
        {
            const timer = setTimeout(() =>
            {
                context.setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [context.showAlert]);




    return  <div>
        {context.showAlert &&
            <ToastContainer
                className="p-3"
                position={'top-end'}
                style={{zIndex: 1}}>
                <Row>
                    <Col xs={6}>
                        <Toast show={true} delay={100} autohide
                               style={{height: "auto", width: "700px", backgroundColor: "#272727"}}>
                            <Toast.Header style={{backgroundColor: "#303030"}}>
                                <strong style={{color: "#b2b2b2"}} className="me-auto">{title}</strong>
                                <small style={{color: "#b2b2b2"}}>{rightSideMessage}</small>
                            </Toast.Header>
                            <Toast.Body style={{color: "#b2b2b2"}}>{message}</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
            </ToastContainer>
        }
    </div>
}
export default ToastMessage;
