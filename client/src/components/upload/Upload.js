import React, { useState } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./Upload.css";

export const Upload = () => {
  const [uploadVideoState, setUploadVideoState] = useState({
    selectedVideos: null,
    loaded: 0,
  });

  let maxSelectFile = (e) => {
    let files = e.target.files;
    if (files.length > 1) {
        toast.error('Maximum 1 file is allowed');
        e.target.value = null;
        return false;
    } else {
        let err = '';
        for(let i=0; i<files.length; i++) {
            if(files[i].size > 52428800) {
                err += files[i].name + ', ';
            }
        }
        if(err !== '') {
            // error caught
            e.target.value = null;
            toast.error(err + ' is/are too large. Please select file size < 50Mb');
        }
    }
    return true;
  }

  const fileChangeHandler = (e) => {
        const files = e.target.files;
        if(maxSelectFile(e)) {
            setUploadVideoState({
                ...uploadVideoState,
                    selectedVideos: files,
                    loaded: 0
            })
        }
  };

  const fileUploadHandler = (e) => {
    const data = new FormData();
    for(let i = 0; i < uploadVideoState.selectedVideos.length; i++ ) {
        data.append('file', uploadVideoState.selectedVideos[i]);
    }
    axios.post('http://127.0.0.1:3333/api/upload', data, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': "Bearer " + JSON.parse(localStorage.getItem('userTokenTime')).token
    //     }
    // }, {
        onUploadProgress: ProgressEvent => {
            setUploadVideoState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
            });
        }
    }).then( res => {
        toast.success('Upload Successful');
    }).catch(err => {
        toast.error(`Upload Fail with status: ${err.statusText}`);
    });
  };

  return (
    // if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
    <>
    {/* <Navbar /> */}
    <div className="container mt-5">
        <div className="form-group">
            <ToastContainer />
        </div>
        <h4>Upload Video</h4>
        <hr className="my-4" />

      <form
        method="post"
        name="videoUpload"
        action="/api/upload"
        id="#"
        encType="multipart/form-data"
      >
        <div className="form-group files">
          <label htmlFor="video-upload" className="text-info">
            {" "}
            Upload your videos here
          </label>
          <br />
          <input
            id="video-upload"
            className="form-control"
            type="file"
            name="file"
            placeholder="File upload.."
            multiple="multiple"
            accept="video/"
            onChange={fileChangeHandler}
          />
          <Progress
            max="100"
            color="success"
            value={uploadVideoState.loaded}
            className="mt-4 mb-1"
          >
            {isNaN(Math.round(uploadVideoState.loaded, 2)) ? 0 : Math.round(uploadVideoState.loaded, 2)}%
          </Progress>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={fileUploadHandler}
          >
            Upload video
          </button>
        </div>
      </form>
    </div>
    </>
  );
};
