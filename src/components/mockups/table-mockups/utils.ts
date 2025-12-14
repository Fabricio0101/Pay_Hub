export const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) return "-"
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("pt-BR")
}

export const formatImageName = (name: string): string => {
    if (!name) return "-"
    return name.length > 30 ? `${name.substring(0, 30)}...` : name
}

export const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        "b1": "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20",
    }
    return colors[category.toLowerCase()] || "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20"
}

export const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
        "upper": "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20",
        "lower": "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
    }
    return colors[type.toLowerCase()] || "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20"
}
