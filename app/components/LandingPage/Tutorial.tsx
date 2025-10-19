const Tutorial = () => {
  return (
    <section className="
      w-full
      py-12 sm:py-16 md:py-24 lg:py-32
      flex
      justify-center
      items-center
      relative
      overflow-hidden
      bg-white
    ">
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto w-full space-y-10 sm:space-y-12">
        {/* Section heading */}
        <h3 className="text-center font-bold text-3xl lg:text-5xl tracking-tight">
          Still Not Convinced?
        </h3>

        {/* Video container */}
        <div className="
          relative
          max-w-[1000px]
          mx-auto
          aspect-video
          rounded-2xl
          overflow-hidden
          bg-gray-100
          shadow-md
          border border-gray-200
        ">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/RHDoPBe6Rxw"
            title="Product Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
