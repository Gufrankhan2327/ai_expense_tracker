export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-5 text-white shadow-xl 
      bg-white/10 backdrop-blur-lg border border-white/20
      hover:shadow-blue-500/20 transition duration-300 ${className}`}
    >
      {children}
    </div>
  );
}