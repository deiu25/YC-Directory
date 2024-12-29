import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parseContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>;
        <p className="sub-heading !max-w-5xl">{post.description}</p>;
      </section>

      <section className="section_container">
          <img src={post.image} alt="thumbail" className="w-full h-auto rounded-xl" />

          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
                <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                  <Image src={post.author.image} alt="author" width={64} height={64} className="rounded-full drop-shadow-lg" />
                  <div>
                    <p className="text-20-medium">{post.author.name}</p>
                    <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                  </div>
                </Link>

                <p className="category-tag">{post.category}</p>
            </div>

            <h3 className="text-30-bold">Pitch Details</h3>
            {parseContent ? (
              <article className="prose max-w-4xl font-work-sans brake-all"
               dangerouslySetInnerHTML={{ __html: parseContent }} />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>

          <hr className="devider" />

            <Suspense fallback={<Skeleton className="view_skeleton"/>}>
                <View id={id} />
            </Suspense>
      </section>
    </>
  );
};

export default Page;
