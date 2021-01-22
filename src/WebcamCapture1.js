import React, {useRef ,useCallback} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
  };

export const WebcamCapture1 = () => {
    const webcamRef = useRef(null);

    const capture = useCallback(()=>{
        const imageUrl = webcamRef.current.getScreenshot()
        console.log(imageUrl)
    } , [webcamRef])

    return (
        <div>
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
        </div>
    )
}
