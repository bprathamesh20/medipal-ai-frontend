import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2 px-7'>
      <label className="btn  btn-secondary btn-sm text-xs">
        <UploadIcon/>Upload report
        <input type="file" style={{ display: 'none' }} onChange={handleFileSelect} />
      </label>
      <span className='text-xs'>{selectedFile && <p>{selectedFile.name}</p>}</span>
    </div>
  );
};

export default FileUpload;
