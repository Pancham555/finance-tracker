import React from "react";

export default function Statement({
  ref,
}: {
  ref: React.Ref<HTMLDivElement> | null;
}) {
  return (
    <div className="text-3xl font-semibold" ref={ref}>
      Statement
    </div>
  );
}
