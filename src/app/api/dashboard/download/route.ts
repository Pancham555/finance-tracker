// /pages/api/download.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the file (e.g., read from local filesystem)
    const filePath = "/example.pdf"; // Update with your actual file path
    const fileContent = fs.readFileSync(__dirname + filePath);

    // Set headers for download
    res.setHeader("Content-Disposition", `attachment; filename="my-file.pdf"`);
    res.setHeader("Content-Type", "application/pdf"); // Adjust content type as needed

    // Send the file content
    // return  res.status(200).send(fileContent);
    return NextResponse.json(fileContent);
  } catch (error) {
    console.error("Error fetching the file:", error);
    return NextResponse.json({ error: "Error fetching the file" });
  }
}
