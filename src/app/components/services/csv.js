function cleanCell(value = "") {
    return value.trim().replace(/^"|"$/g, "");
}

export function parseCSVText(csvText = "") {
    const lines = csvText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length <= 1) return [];

    const dataRows = lines.slice(1);

    return dataRows
        .map((row, index) => {
            const [date, amount, category, type] = row.split(",").map(cleanCell);

            if (!date || !amount || !category || !type) return null;

            return {
                id: `csv-${Date.now()}-${index}`,
                date,
                amount: Number(amount),
                category,
                type: type.toLowerCase() === "income" ? "income" : "expense",
            };
        })
        .filter((item) => item && Number.isFinite(item.amount));
}
