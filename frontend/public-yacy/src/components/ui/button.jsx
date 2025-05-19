export function Button({ children, ...props }) {
  return <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800" {...props}>{children}</button>;
}
