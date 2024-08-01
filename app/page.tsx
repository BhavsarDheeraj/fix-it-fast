import prisma from "@/prisma/client";
import { IssueStatus } from "@prisma/client";
import IssueChart from "./IssueChart";

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

  return <IssueChart open={open} inProgress={inProgress} closed={closed} />;

  // return <IssueSummary open={open} inProgress={inProgress} closed={closed} />;
}
