interface HeroVideoProps {
  title?: React.ReactNode;
  subtitle?: string;
  videoSrc?: string;
}

export default function HeroVideo({
  title,
  subtitle,
  videoSrc = "/videos/hero-video.mp4",
}: HeroVideoProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video autoPlay loop muted className="h-full w-full object-cover">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

      {/* Content container */}
      <div className="section-padding relative z-10 flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-page">
          <div className="flex flex-col gap-6 text-white">
            <h1 className="text-h1 max-w-3xl">
              {title || (
                <>
                  Crafting{" "}
                  <span className="text-accent">digital experiences</span>
                  <br />
                  that drive results
                </>
              )}
            </h1>

            {subtitle && (
              <p className="text-body-1 max-w-xl text-white/90">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
