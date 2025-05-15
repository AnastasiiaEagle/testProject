'use client'


type CardPostsProps = {
    id: string,
    name: string,
    date: string,
    time: string,
    importance: string
}

export default function CardPosts({id, name, date, time, importance}:CardPostsProps) {        

    const handleViewClick = () =>{
        window.location.href = `/view/${id}`;
    }

    const getImportanceColor = (level: string) => {
        switch (level) {
        case "CRITICAL":
            return "text-red-600"
        case "NORMAL":
            return "text-yellow-600"
        case "IMPORTANT":
            return "text-green-600"
        default:
            return "text-gray-600"
        }
    }

    return(
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md mb-4 w-full max-w-3xl transition-all duration-200 hover:shadow-lg hover:bg-gray-100 ">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-500">Дата: {date}</p>
                <p className="text-sm text-gray-500">Час: {time}</p>
                <p className={`text-sm font-medium ${getImportanceColor(importance)}`}>
                Срочність: {
                    importance === "NORMAL" ? "Звичайна" :
                    importance === "IMPORTANT" ? "Важлива" :
                    "Критична"
                }
                </p>
            </div>

            <button
                onClick={handleViewClick}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
                Переглянути
            </button>
        </div>
    )
}