
type ViewInfoCardProps = {
  name: string;
  description: string;
  date: string;
  time: string;
  importance: "NORMAL" | "IMPORTANT" | "CRITICAL";
  onEdit: () => void;
  onDelete: () => void;
};

export default function ViewInfoCard({
    name,
    description,
    date,
    time,
    importance,
    onEdit,
    onDelete,
    }: ViewInfoCardProps) {

    const getImportanceColor = () => {
        switch (importance) {
        case "CRITICAL":
            return "text-red-600";
        case "IMPORTANT":
            return "text-green-600";
        case "NORMAL":
            return "text-yellow-600";
        default:
            return "text-gray-600";
        }
    }

    const getImportanceLabel = () => {
        switch (importance) {
        case "CRITICAL":
            return "Критична";
        case "IMPORTANT":
            return "Важлива";
        case "NORMAL":
            return "Звичайна";
        default:
            return "Невідома";
        }
    }
    return(
        <>
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-3xl ">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {name}
                    </h2>
                    <p className="text-gray-700 mb-2">
                        <strong>Опис: </strong>
                        {description}
                    </p>
                    <p className="text-gray-700 mb-1">
                        <strong>Дата: </strong>
                        {date}
                    </p>
                    <p className="text-gray-700 mb-1">
                        <strong>Час:</strong> 
                        {time}
                    </p>
                    <p className={`font-medium 
                        ${getImportanceColor()}
                        `}>
                        <strong>Важливість: </strong> 
                        {getImportanceLabel()}
                    </p>

                    <div className="mt-4 flex justify-center gap-4">
                        <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        >
                        Редагувати
                        </button>
                        <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                        >
                        Видалити
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
