import React, { useEffect, useReducer, useState } from "react";
import "../App.css";
import { useRecordWebcam } from "react-record-webcam";
import { Link } from "react-router-dom";
import { initialState, reducer } from "../ContextApi/Reducer";

const Interview: React.FC = () => {
  const {
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  // =================================================
  const [videoId, setVideoId] = useState<string>("");
  const [start, setStart] = useState<boolean>(true);
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  // console.log(state, dispatch, "heeeyyyyy");
  // const [preview, setPreview] = useState<boolean>(false);
  // =============================================
  const decide = () => {
    setStart((prev) => !prev);
    if (start) {
      startInterview();
    } else {
      stopVideo(videoId, dispatch);
    }
    console.log(start);
  };
  const startInterview = async () => {
    try {
      const recording = await createRecording();
      if (!recording) return;
      await openCamera(recording.id);
      await startRecording(recording.id);
      setVideoId(recording.id);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      // await stopRecording(recording.id);
    } catch (error) {
      console.error({ error });
    }
  };
  useEffect(() => {
    console.log("video id is :" + videoId, "\n", typeof videoId);
  }, [videoId]);

  const stopVideo = async (id: string, dispatch: React.Dispatch<any>) => {
    try {
      await stopRecording(id);
      dispatch({ type: "Preview_Record", payload: activeRecordings });
      console.log("recording stopped");
    } catch (err) {
      console.log("the error happened on stop is " + err);
    }
  };

  return (
    <>
      <div
        key="main-interview"
        className="w-3/4 m-auto h-72 border-inherit bg-white flex justify-between"
      >
        <div key="user" className="w-3/6 border-inherit bg-gray-500 rounded-md">
          {/* ======================= */}
          <div className="demo size-full">
            <div className="recordings">
              {activeRecordings.map((recording) => (
                <div key={recording.id}>
                  <video ref={recording.webcamRef} autoPlay muted />
                  <div
                    style={{ width: "100%" }}
                    key="preview"
                    className={
                      recording.status === "STOPPED" ? "preview show" : "hide"
                    }
                  >
                    {/* <p>Preview</p>
                    
                    <video ref={recording.previewRef} autoPlay loop /> */}
                    <Link to={`/preview`}> show preview</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div key="bot" className=" border-inherit  rounded-md">
          <div key="bot-profile" className="w-80 h-72 m-auto  bg-white">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
              src="https://iili.io/JALZqcG.md.png"
              alt="JALZqcG.md.png"
            />
          </div>
        </div>
      </div>
      {/* ================================================= */}
      <div key="button-container" className=" w-60 m-auto flex">
        <div
          key="stop"
          className="w-36 h-16 mt-5 m-auto rounded-md border-2 bg-slate-700"
          onClick={decide}
        >
          {start ? "Start the Interview" : "End the interview"}
        </div>
      </div>
      {/* ======================================== */}
      <div
        key="Dialogue Box"
        className="w-3/4 mt-6 m-auto  border-inherit bg-white grid grid-cols-4 gap-2 "
      >
        <div
          key="textArea"
          className="grid grid-cols-subgrid col-span-3 rounded-xl  bg-slate-400"
        ></div>
        <div key="Controllers" className="rounded-xl bg-slate-400 ">
          <div
            key="req"
            className="w-16 h-16 mt-5 m-auto rounded-full  border-solid border-2 bg-emerald-700 "
          >
            {" "}
            <img src="https://i.ibb.co/R9F5KgN/mic-2.png" alt="" />
          </div>
          <br />
          <div
            key="stop"
            className="w-16 h-16 mt-5 m-auto rounded-full border-2 bg-red-600 "
          >
            <img src="https://i.ibb.co/Yd49Pdn/off.png" alt="" />
          </div>
          {/* <div
            key="stop"
            className="w-16 h-16 mt-5 m-auto rounded-full border-2 bg-yellow-600 "
          >
            <img src="https://i.ibb.co/71qQmrh/download-2.png" alt="" />
          </div> */}
        </div>
      </div>
      {/* preview section */}
      <div className="rounded-lg ">
        <div key="previewss" className="m-auto">
          <div className="demo size-full size-3/5d m-auto">
            <div className="recordings">
              {activeRecordings.map((recording) => (
                <div key={recording.id}>
                  <div
                    key="preview"
                    className={
                      recording.status === "STOPPED" ? "preview show" : "hide"
                    }
                    style={{
                      backgroundColor: "green",
                      width: "900px",
                    }}
                  >
                    <p>Preview</p>
                    <video ref={recording.previewRef} autoPlay />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =============    content    ============= */}
        <div
          key="feedback"
          style={{ display: start ? "none" : "block" }}
          className=""
        >
          feedback
        </div>
        <div key="graph" className="">
          graph
        </div>
      </div>
    </>
  );
};

export default Interview;
