import prisma from "@/prisma/client";
import { IssueStatus } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: IssueStatus.OPEN },
  });
  const inProgress = await prisma.issue.count({
    where: { status: IssueStatus.IN_PROGRESS },
  });
  const closed = await prisma.issue.count({
    where: { status: IssueStatus.CLOSED },
  });

  console.log("Home");

  console.log("Open issue", open);
  console.log("In progress issue", inProgress);
  console.log("Closed issue", closed);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Fix It Fast - Dashboard",
  description: "View a summary of project issues",
};
