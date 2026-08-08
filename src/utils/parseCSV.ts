export function parseCSV(text: string) {
    const rows = [];
    let i = 0,
        col = "",
        row = [],
        inQuotes = false;
    while (i < text.length) {
        const c = text[i];
        if (inQuotes) {
            if (c === '"') {
                if (text[i + 1] === '"') {
                    col += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                col += c;
            }
        } else {
            if (c === '"') inQuotes = true;
            else if (c === ",") {
                row.push(col);
                col = "";
            } else if (c === "\r") {
            } else if (c === "\n") {
                row.push(col);
                rows.push(row);
                row = [];
                col = "";
            } else {
                col += c;
            }
        }
        i++;
    }
    if (col.length || row.length) {
        row.push(col);
        rows.push(row);
    }
    return rows;
}
