import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import StatusSelect from "./StatusSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid
      gap="5"
      columns={{
        initial: "1",
        sm: "5",
      }}
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <StatusSelect issue={issue} />
            <AssigneeSelect issue={issue} />
            <EditIssueButton id={id} />
            <DeleteIssueButton id={id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
