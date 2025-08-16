type ProfileInputProps = {
    label: string;
    value: string
    onChange?: (value: string) => void;
    type?: "text" | "password" | "select";
    options?: string[];
    readOnly?: boolean;
};

export default function ProfileInput({
                                         label,
                                         value,
                                         onChange,
                                         type = "text",
                                         options,
                                         readOnly = false
                                     }: ProfileInputProps) {
    return (
        <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none">
                {label}
            </span>
            {type === "select" && options? (
                <select
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-full pl-20 pr-3 py-2 rounded-md text-base text-white bg-transparent border border-gray-800 focus:outline-none focus:ring-0"
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ):(
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    readOnly={readOnly}
                    className="w-full pl-20 pr-3 py-2 rounded-md text-base text-white bg-transparent border border-gray-800 focus:outline-none focus:ring-0"
                />
            )}
        </div>
    );
}