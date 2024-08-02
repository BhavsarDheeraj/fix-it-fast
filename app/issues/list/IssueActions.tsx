import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Suspense } from "react";
import IssueAssignedToFilter from "./IssueAssignedToFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="3">
        <Suspense>
          <IssueStatusFilter />
        </Suspense>
        <Suspense>
          <IssueAssignedToFilter />
        </Suspense>
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
