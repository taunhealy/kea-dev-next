interface HeroVideo2Props {
  title?: React.ReactNode;
  subtitle?: string;
  videoSrc?: string;
}

export default function HeroVideo2({
  title,
  subtitle,
  videoSrc = "/videos/hero-video-2.mp4",
}: HeroVideo2Props) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Video container */}
      <div className="absolute inset-0 z-0 h-full w-full mix-blend-screen opacity-80">
        <video autoPlay loop muted className="h-full w-full object-cover">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content overlay */}
      <div className="section-padding relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-page">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-h1 text-white">
              {title || (
                <>
                  Next-level{" "}
                  <span className="text-accent">digital innovation</span>
                  <br />
                  for modern businesses
                </>
              )}
            </h1>

            {subtitle && (
              <p className="text-body-1 mx-auto max-w-2xl text-white/80 md:mx-0">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scrim overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary/20" />
    </section>
  );
}
