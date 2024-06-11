export function NavSection({ title, children }) {
  return (
    <div className="my-2">
      <h3 className="text-my-gray-200 uppercase text-sm font-bold tracking-wider py-4">{title}</h3>
      { children }
    </div>
  )
}