'use client';

import { Box, Skeleton } from '@mui/material';

interface FormSkeletonProps {
  fields?: number;
}

export default function FormSkeleton({ fields = 4 }: FormSkeletonProps) {
  return (
    <Box className="w-full">
      {/* Title */}
      <Skeleton variant="text" width="60%" height={40} className="mb-1" />
      
      {/* Description */}
      <Skeleton variant="text" width="80%" height={24} className="mb-3" />
      
      {/* Form fields */}
      <Box className="flex flex-col gap-2">
        {Array.from({ length: fields }).map((_, index) => (
          <Box key={index}>
            <Skeleton variant="text" width="30%" height={20} className="mb-0.5" />
            <Skeleton variant="rounded" width="100%" height={56} />
          </Box>
        ))}
      </Box>
      
      {/* Privacy notice */}
      <Skeleton variant="text" width="90%" height={20} className="mt-2" />
      
      {/* Action buttons */}
      <Box className="flex gap-2 mt-3">
        <Skeleton variant="rounded" width={100} height={42} />
        <Skeleton variant="rounded" width={100} height={42} />
      </Box>
    </Box>
  );
}
