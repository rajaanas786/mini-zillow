export default function HeroBanner() {
  return (
    <div
      className="relative w-full h-[350px] md:h-[500px] bg-cover bg-center rounded-lg shadow"
      style={{
        backgroundImage: `url('/img/dubai-img.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center px-4">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl">
            Explore the best properties in your city — fast, secure & easy.
          </p>
        </div>
      </div>
    </div>
  );
}
