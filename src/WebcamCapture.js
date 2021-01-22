import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import "./WebcamCapture.css";
import { useHistory } from "react-router-dom";
import { setCameraImage } from "./features/cameraSlice";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

export  const WebcamCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const history = useHistory();

  //after clicking on button we are pushing that image in the preview screen with useHistory hook
    const capture = useCallback(() => {
        //console.log(webcamRef)
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      dispatch(setCameraImage(imageSrc))
      history.push("/preview");
    }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className="webcamCaptur__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};
