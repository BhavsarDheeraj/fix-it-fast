import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="space-y-3 max-w-xl">
      <Skeleton height="1rem" />
      <Flex gap="3">
        <Skeleton width="5rem" height="1rem" />
        <Skeleton width="5rem" height="1rem" />
      </Flex>
      <Card>
        <Skeleton height="4rem" />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
