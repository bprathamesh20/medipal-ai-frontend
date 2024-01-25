import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile); // Change 'pdfFile' to 'file' to match server's expectation

      try {
        const response = await fetch('http://localhost:3000/multipart-parse', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`File upload failed with status: ${response.status}`);
        }

        const { pdfText } = await response.json();
        console.log(pdfText);

        // Make a query to the backend with the extracted data
        await fetch('http://localhost:3000/processData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ extractedData: pdfText }),
        });

        console.log('Data extracted and query sent to the backend: ' + pdfText);
      } catch (error) {
        console.error('File upload error:', error.message);
      }
    } else {
      console.warn('No file selected');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2 px-7'>
      <label className="btn  btn-secondary btn-sm text-xs">
        <UploadIcon />Choose report
        <input type="file" style={{ display: 'none' }} onChange={handleFileSelect} />
      </label>
      <span className='text-xs'>{selectedFile && <p>{selectedFile.name}</p>}</span>
      <button className="btn btn-active btn-secondary btn-sm text-xs" onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
