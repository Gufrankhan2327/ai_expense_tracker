export default function Card({
  title,
  value,
  icon,
  children,
  className = ""
}) {
  return (
    <div
      className={`
        rounded-2xl p-5 text-white shadow-xl
        bg-white/10 backdrop-blur-lg
        border border-white/20
        hover:scale-[1.02]
        hover:shadow-blue-500/20
        transition duration-300
        ${className}
      `}
    >
      {(title || icon) && (
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm text-gray-300">
            {title}
          </h2>

          <span className="text-xl">
            {icon}
          </span>
        </div>
      )}

      {value !== undefined && (
        <h1 className="text-3xl font-bold mb-2">
          {value}
        </h1>
      )}

      {children}
    </div>
  );
}