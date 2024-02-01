import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';

const FileUpload = ({  onDataUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ispdf, setispdf] = useState(false)

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        // First fetch for file upload
        const responseUpload = await fetch('http://143.244.136.200:3000/multipart-parse', {
          method: 'POST',
          body: formData,
        });
  
        if (!responseUpload.ok) {
          throw new Error(`File upload failed with status: ${responseUpload.status}`);
        }
  
        const { extractedData } = await responseUpload.json();
        console.log('Data extracted:', extractedData);
         
        setispdf(true)

        // Second fetch for processing data
        const responseProcess = await fetch('http://143.244.136.200:3000/process-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ extractedData }),
        });
  
        if (!responseProcess.ok) {
          throw new Error(`Data processing failed with status: ${responseProcess.status}`);
        }
  
        const { message } = await responseProcess.json();
        console.log('Server response:', message);
        onDataUpload(message, extractedData)
  
        // Perform additional actions if needed
  
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.warn('No file selected');
    }
  };
  
  if(!ispdf){
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
  }
  
};

export default FileUpload;
