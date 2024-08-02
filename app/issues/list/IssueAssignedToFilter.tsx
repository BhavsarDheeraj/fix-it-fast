"use client";

import { Select, Skeleton } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useUsers } from "../[id]/AssigneeSelect";

const IssueAssignedToFilter = () => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  const router = useRouter();
  const searchParams = useSearchParams();

  const getAssignedToUserIdValue = () => {
    const userId = searchParams.get("assignedToUserId");
    if (userId === null) return undefined;
    else return userId;
  };

  return (
    <Select.Root
      value={getAssignedToUserIdValue()}
      onValueChange={(userId) => {
        const params = new URLSearchParams(searchParams.toString());
        if (userId === "all") params.delete("assignedToUserId");
        else params.set("assignedToUserId", userId);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Skeleton loading={isLoading}>
        <Select.Trigger placeholder="Assigned to..." />
      </Skeleton>
      <Select.Content>
        <Select.Group>
          <Select.Item value={"all"}>All</Select.Item>
          <Select.Item value="unassigned">Unassigned</Select.Item>
        </Select.Group>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssignedToFilter;
