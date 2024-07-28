import { Box, Skeleton } from "@radix-ui/themes";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl space-y-4">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
