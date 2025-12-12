import React from "react";

export default function Footer() {
  return (
    <div className="w-full py-10 text-center text-gray-600 font-[Poppins] bg-gray-50">
      © {new Date().getFullYear()} ISH Cosmetics — All Rights Reserved.
    </div>
  );
}
