'use client';

import { Box, Button, styled, Typography } from "@mui/material";
import { Upload } from "lucide-react";
import theme from "@/theme/theme";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FileDropZoneProps {
  isDragging: boolean;
  file: File | null;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  formats?: string;
  buttonText?: string;
  multiple?: boolean;
}

export default function FileDropZone({
  isDragging,
  file,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileChange,
  placeholder = 'Drag and drop your file here',
  formats = 'Supported formats: PDF, XLSX, CSV',
  buttonText = 'Browse Files',
  multiple = false,
}: FileDropZoneProps) {
  return (
    <Box
      component="div"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex flex-col items-center p-8 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <Upload size={40} color={isDragging ? theme.palette.text.blue : theme.palette.text.secondary} />
      
      {file ? (
        <Typography variant="body2" component="p" className="mt-2 mb-1 font-semibold" sx={{ color: 'success.main' }}>
          ✓ {file.name}
        </Typography>
      ) : (
        <Typography variant="body2" component="p" className="mt-2 mb-1">
          {placeholder}
        </Typography>
      )}
      
      <Typography variant="caption" component="p" className="mb-1">
        {formats}
      </Typography>
      
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<Upload size={16} />}
      >
        {buttonText}
        <VisuallyHiddenInput
          type="file"
          onChange={onFileChange}
          multiple={multiple}
        />
      </Button>
    </Box>
  );
}
