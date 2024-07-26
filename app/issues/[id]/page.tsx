import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <Grid
      gap="5"
      columns={{
        initial: "1",
        md: "2",
      }}
    >
      <Box className="space-y-3">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" align="center">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
