import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './CSVUploader.css';
import CircularProgress from '../ui/CircularProgress';

const CSVUploader = ({ onCancel }) => {
  const [files, setFiles] = useState([]);
  const [step, setStep] = useState('initial'); // 'initial', 'confirming', 'uploading'
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
      if (files.length > 0) {
          setStep('confirming');
      }
  };

  const handleUpload = () => {
    setStep('uploading');
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                onCancel(); // Close modal on completion
                return 100;
            }
            return prev + 10;
        });
    }, 200);
  };

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    }))]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: { 'text/csv': ['.csv'] }
  });

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const renderInitial = () => (
    <>
      <div {...getRootProps({className: 'drop-zone'})}>
        <input {...getInputProps()} />
        <p>Drag your file(s) to start uploading or <button type="button" onClick={open} className="browse-link">Browse files</button></p>
      </div>
      <div className="file-list">
        {files.map(file => (
            <div className="file-item" key={file.path}>
                <span>{file.path} - {file.size} bytes</span>
                <button onClick={() => removeFile(file.name)}>X</button>
            </div>
        ))}
      </div>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn-primary" onClick={handleNext} disabled={files.length === 0}>Next</button>
      </div>
    </>
  );

  const renderConfirming = () => (
      <>
        <div className="file-list">
            {/* Using the first file for simplicity */}
            <div className="file-item-lg">
                <span>{files[0].name}</span>
                <span>{(files[0].size / 1024 / 1024).toFixed(2)}MB</span>
            </div>
        </div>
        <p className="confirmation-text">
            All the Leads will be distributed among other employees Equally.
        </p>
        <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setStep('initial')}>Cancel</button>
            <button className="btn-primary" onClick={handleUpload}>Confirm</button>
        </div>
    </>
  );

  const renderUploading = () => (
      <div className="uploading-view">
        <CircularProgress progress={progress} />
        <p>Verifying...</p>
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
  );

  const renderStep = () => {
      switch (step) {
          case 'confirming': return renderConfirming();
          case 'uploading': return renderUploading();
          case 'initial':
          default:
              return renderInitial();
      }
  }

  return (
    <div className="csv-uploader">
      <h3 className="uploader-title">CSV Upload</h3>
      <p className="uploader-subtitle">Add your documents here</p>
      {renderStep()}
    </div>
  );
};

export default CSVUploader; 