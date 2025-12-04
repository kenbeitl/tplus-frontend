import { useState } from 'react';

interface UseFileDropOptions {
  onFileSelect?: (file: File) => void;
}

export const useFileDrop = (options?: UseFileDropOptions) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      setFile(selectedFile);
      
      console.log('File path:', selectedFile.name);
      console.log('File blob:', selectedFile);
      console.log('File type:', selectedFile.type);
      console.log('File size:', selectedFile.size);

      if (options?.onFileSelect) {
        options.onFileSelect(selectedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
      
      console.log('File path:', selectedFile.name);
      console.log('File blob:', selectedFile);
      console.log('File type:', selectedFile.type);
      console.log('File size:', selectedFile.size);

      if (options?.onFileSelect) {
        options.onFileSelect(selectedFile);
      }
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return {
    isDragging,
    file,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    clearFile,
  };
};
