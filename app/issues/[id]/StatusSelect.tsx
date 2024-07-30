"use client";

import { statusMap } from "@/app/components/IssueStatusBadge";
import { Issue, IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const [selectedStatus, setSelectedStatus] = useState(issue.status);

  const changeStatus = async (status: string) => {
    const originalStatus = selectedStatus;
    axios
      .patch<Issue>("/api/issues/" + issue.id, {
        status,
      })
      .then((response) => {
        setSelectedStatus(response.data.status);
      })
      .catch((error) => {
        toast.error("Changes could not be saved.");
        setSelectedStatus(originalStatus);
      });
  };

  return (
    <>
      <Select.Root onValueChange={changeStatus} value={selectedStatus}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Select Status</Select.Label>
            {Object.values(IssueStatus).map((status) => (
              <Select.Item value={status} key={status}>
                {statusMap[status].label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
