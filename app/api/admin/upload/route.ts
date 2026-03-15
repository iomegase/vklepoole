import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth/session";
import { uploadAssetToCloudinary } from "@/lib/cloudinary/upload";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file." }, { status: 400 });
    }

    const asset = await uploadAssetToCloudinary(file);
    return NextResponse.json(asset);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload failed.",
      },
      { status: 500 },
    );
  }
}
