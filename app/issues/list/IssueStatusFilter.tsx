"use client";

import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: IssueStatus }[] = [
  { label: "All" },
  { label: "Open", value: IssueStatus.OPEN },
  { label: "In Progress", value: IssueStatus.IN_PROGRESS },
  { label: "Closed", value: IssueStatus.CLOSED },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? undefined}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== "all") params.set("status", status);
        const orderBy = searchParams.get("orderBy");
        if (orderBy) params.set("orderBy", orderBy);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value ?? "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
