import { useState } from "react";

type FilterProps = {
    onFilterInput: (emotion: string) => void;
}

export default function FilterInput({onFilterInput}:FilterProps) {
    const [inputValue, setInputValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        onFilterInput(value)
    }

    return(
        <div className="w-full bg-white shadow p-4 flex items-center justify-center">
            <div className="flex w-full max-w-4xl">
                <input
                    type="text"
                    placeholder="Пошук події..."
                    value={inputValue}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full "
                />
            </div>
        </div>
    )
}