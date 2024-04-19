import Messages from "@/components/dashboard/Message";
import React from "react";

const page = ({ params }) => {
  const { userId } = params;

  return (
    <div>
      <Messages id={userId} />
    </div>
  );
};

export default page;
