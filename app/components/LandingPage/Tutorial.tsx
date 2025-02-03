const Tutorial = () => {
  return (
    <section className="
      w-full 
      py-28 
      flex 
      justify-center 
      items-center 
      bg-primary 
      relative 
      overflow-hidden
    ">
      {/* Background glow effect */}
      <div className="
        absolute 
        -left-[400px] 
        top-1/2 
        transform 
        -translate-y-1/2 
        w-[1000px] 
        h-[1000px] 
        bg-secondary 
        rounded-full 
        blur-3xl
      " />

      <div className="default-container space-y-12">
        {/* Section heading */}
        <h3 className="text-center dynamic-subheading font-semibold">
          Still Not Convinced?
        </h3>

        {/* Video container */}
        <div className="
          relative 
          max-w-[1000px] 
          mx-auto 
          aspect-video 
          rounded-xl 
          overflow-hidden 
          bg-gray-100
        ">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
