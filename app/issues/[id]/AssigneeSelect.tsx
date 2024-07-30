"use client";

import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const [assignedToUserId, setAssignedToUserId] = useState(
    issue.assignedToUserId ?? "null"
  );

  if (error) return null;

  const assignIssue = async (userId: string) => {
    const originalAssignedToUserId = assignedToUserId;
    axios
      .patch<Issue>("/api/issues/" + issue.id, {
        assignedToUserId: userId !== "null" ? userId : null,
      })
      .then((response) => {
        setAssignedToUserId(response.data.assignedToUserId ?? "null");
      })
      .catch((error) => {
        toast.error("Changes could not be saved.");
        setAssignedToUserId(originalAssignedToUserId);
      });
  };

  return (
    <>
      <Select.Root onValueChange={assignIssue} value={assignedToUserId}>
        <Skeleton loading={isLoading}>
          <Select.Trigger placeholder="Assign..." />
        </Skeleton>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id}>{user.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes,
    retry: 3,
  });

export default AssigneeSelect;
