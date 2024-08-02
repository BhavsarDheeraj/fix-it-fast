import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { IssueStatus } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { Suspense } from "react";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(IssueStatus);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const assignedToUserId =
    searchParams.assignedToUserId !== "all"
      ? searchParams.assignedToUserId === "unassigned"
        ? null
        : searchParams.assignedToUserId
      : undefined;

  const where = { status, assignedToUserId };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy ?? { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Suspense>
        <Pagination
          currentPage={page}
          itemCount={issueCount}
          pageSize={pageSize}
        />
      </Suspense>
    </Flex>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Fix It Fast - Issue List",
  description: "View all project issues",
};
