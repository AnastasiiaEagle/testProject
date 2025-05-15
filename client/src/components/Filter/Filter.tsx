import { useState } from "react";

type FilterProps = {
    onFilter: (importance: string) => void;
}

export default function Filter({onFilter}:FilterProps) {
    const [importance, setImportance] = useState('');

    return (
        <div className="w-full bg-white shadow p-4 flex items-center justify-center">
            <div className="flex gap-4 w-full max-w-4xl">
                <select
                value={importance}
                onChange={(e) => setImportance(e.target.value)}
                className="border p-2 rounded w-full"
                >
                    <option value="">Оберіть важливість</option>
                    <option value="CRITICAL">Критична</option>
                    <option value="NORMAL">Звичайна</option>
                    <option value="IMPORTANT">Важлива</option>
                </select>

                <button
                onClick={() => onFilter(importance)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                Пошук
                </button>
            </div>
        </div>
    );
}