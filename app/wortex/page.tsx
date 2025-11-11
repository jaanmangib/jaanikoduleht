export default function WortexPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-black"
      style={{
        backgroundImage: "url(/bg.png)", // sama taust mis põhilehel
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* hämar kiht üle tausta */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* pilt ees */}
      <main className="relative z-10 flex flex-col items-center justify-center">
        <img
          src="/wortex.png"
          alt="Wortex"
          className="max-h-[90vh] w-auto object-contain drop-shadow-2xl"
        />
      </main>
    </div>
  );
}
