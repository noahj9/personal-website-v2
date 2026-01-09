"use client";

import React, { useEffect } from "react";

export function SubstackEmbed() {
  useEffect(() => {
    // Create the Supascribe script element
    const script = document.createElement("script");
    script.src =
      "https://js.supascribe.com/v1/loader/C6y0NHV4QVMMITpcqRiRmgneaUE2.js";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div data-supascribe-embed-id="503180459185" data-supascribe-feed></div>
  );
}
