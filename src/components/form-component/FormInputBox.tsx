export default function FormInputBox({
  searchValue,
  onChange,
  description,
}: FormInputEntries) {
  return (
    <div className="flex w-fit flex-col items-start">
      {description && (
        <label
          className={`m-2 text-sm font-semibold`}
          htmlFor={`${description}-id`}
        >
          {description}
        </label>
      )}
      <input
        className="focus:border-inputfocus focus:caret-inputfocus border-1 border-line rounded-md border bg-white px-3 py-2 text-sm font-medium transition-colors focus:outline-none"
        type="search"
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
}

interface FormInputEntries {
  searchValue: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  description?: string;
}
