import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Link } from "@radix-ui/themes";
import React from "react";

const EditIssueButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/issues/${id}/edit`}>
      <Button>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
