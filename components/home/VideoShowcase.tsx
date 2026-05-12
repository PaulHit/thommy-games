"use client";

interface HomeVideo {
  label: string;
  videoUrl?: string;
}

interface VideoShowcaseProps {
  videos: HomeVideo[];
}

function VideoCard({ video }: { video: HomeVideo }) {
  return (
    <div className="relative aspect-[9/16] max-w-[360px] md:max-w-[400px] w-full rounded-2xl overflow-hidden shadow-xl mx-auto group">
      {video.videoUrl ? (
        <video
          src={video.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover pointer-events-none select-none"
          onContextMenu={(e) => e.preventDefault()}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green/15 via-cream to-gold/15 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-gold ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm text-text/50 font-medium">{video.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VideoShowcase({ videos }: VideoShowcaseProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-3xl mx-auto">
          {videos.map((video) => (
            <VideoCard key={video.label} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
