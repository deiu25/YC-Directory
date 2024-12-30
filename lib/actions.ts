"use server";

import { getAuthSession } from "@/auth";
import { parseServerActionResponse, manualSlugify } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await getAuthSession();

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    const slug = manualSlugify(title as string);

    try {
        const startup = {
          title,
          description,
          category,
          image: link,
          slug: {
            _type: slug,
            current: slug,
          },
          author: {
            _type: "reference",
            _ref: session?.id,
          },
          pitch,
        };
    
        const result = await writeClient.create({ _type: "startup", ...startup });
    
        return parseServerActionResponse({
          ...result,
          error: "",
          status: "SUCCESS",
        });
      } catch (error) {
        console.log(error);
    
        return parseServerActionResponse({
          error: JSON.stringify(error),
          status: "ERROR",
        });
      }
    };
    