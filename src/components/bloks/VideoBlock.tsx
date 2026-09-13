import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface VideoFields {
  title?: string;
  video_url?: string;
  poster_url?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export default function VideoBlock({ blok }: BaseBlokProps<VideoFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-black">
      <div {...storyblokEditable(blok)}>
        {blok.title && <h2 className="section-title text-white mb-8 text-center">{blok.title}</h2>}
        {blok.video_url && (
          <video
            className="w-full max-h-[70vh] object-cover"
            controls
            autoPlay={blok.autoplay}
            loop={blok.loop}
            poster={blok.poster_url}
          >
            <source src={blok.video_url} type="video/mp4" />
          </video>
        )}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
