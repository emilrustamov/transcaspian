export default function DropdownOption(
  {
    text,
    value,
    setValue
  }: {
  text: string,
  value: any,
  setValue: any,
}
) {
  return (
    <button type="button" onClick={() => setValue(value)} className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 border-b">{text}</button>
  )
} 