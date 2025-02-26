"use client";

import { useEffect, useState } from "react";

export default function Heading() {
  const [heading, setHeading] = useState("Loading…");

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (!res.ok) return { message: "Failed to load." };
        return res.json();
      })
      .then((data) => {
        setHeading(data.message);
      });
  }, []);

  return (
    <h1 class="text-xl">{heading}</h1>
  );
}
