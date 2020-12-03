import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
function index() {
  return (
    <div>
      <Link href="/dashboard">
        <Button>dashboard</Button>
      </Link>
    </div>
  );
}

export default index;
