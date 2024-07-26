import { Box, Skeleton, Table } from "@radix-ui/themes";
import React from "react";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <Box className="space-y-5 max-w-xl">
      <IssueActions />
      <Table.Root variant="surface" size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton width="5rem" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton width="5rem" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton width="5rem" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default LoadingIssuesPage;
