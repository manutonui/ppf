import { useRef, useState } from "react";

const TakePhoto = ({onCapture, closeModal}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(stream)
            videoRef.current.srcObject = stream;
            videoRef.current.style.transform = 'scaleX(-1)'
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          setStream(null);
        }
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        const maxWidth = 540; // Set your desired maximum width
        const maxHeight = 540; // Set your desired maximum height

        const scaleFactor = Math.min(maxWidth / video.videoWidth, maxHeight / video.videoHeight);

        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;

        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoURL = canvas.toDataURL('image/jpeg');
        onCapture(photoURL);
        stopCamera()
        closeModal()
    };


    return (
        <div className="camera">
            {/* <div className="row"> */}
                {/* <div className="col-md-6"> */}
                    <video ref={videoRef} autoPlay playsInline className="photovid" />
                    <div className="photo-btns">
                        <button className="btn btn-sm btn-info" onClick={startCamera}>Start Camera</button>
                        <button className="btn btn-sm btn-info" onClick={capturePhoto}>Capture Photo</button>
                    </div>
                {/* </div> */}
                {/* <div className="col-md-6"> */}
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                {/* </div> */}
            {/* </div> */}
        </div>
    );
}
 
export default TakePhoto;