import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokAsset } from "./types";

interface BlogPostRef {
  _uid: string;
  uuid?: string;
  slug?: string;
  content?: {
    title?: string;
    excerpt?: string;
    category?: string;
    date?: string;
    image?: StoryblokAsset;
  };
}
interface BlogPostsFields {
  title?: string;
  subtitle?: string;
  featured_posts?: BlogPostRef[];
  limit?: string;
}

export default function BlogPosts({ blok }: BaseBlokProps<BlogPostsFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blok.featured_posts?.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post._uid} className="block group">
              {post.content?.image?.filename && (
                <img src={post.content.image.filename} alt={post.content?.title || ""} className="w-full h-48 object-cover mb-4" />
              )}
              <p className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-gold mb-2">{post.content?.category}</p>
              <h3 className="font-playfair text-xl mb-2 group-hover:text-gold transition-colors">{post.content?.title}</h3>
              <p className="font-montserrat text-sm text-black/60">{post.content?.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
