import xlsx from "json-as-xlsx"

export const downloadExcel = (rawData, provider) => {
    const { pages, num_pages } = rawData.results[provider]

    let extractedData = []

    for(let i = 0; i < num_pages; i++){
      const { tables } = pages[i]
      if(tables.length === 0) continue
      for(let y = 0; y < tables.length; y++){
        const { rows, num_cols } = tables[y]
        const newData = {
          sheet: `Page-${i+1} Table-${y+1}`,
          columns: Array.from({length: num_cols}).map((_, i) => ({label: new Array(i + 1).join(' '), value: `col${i}`})),
          content: rows.map((row) => {
            const obj = {}
            row.cells.forEach((cell, index) => {
              obj[`col${index}`] = cell.text
            })
            return obj
          })
        }
        extractedData.push(newData)
      } 
    }

    if(extractedData.length === 0) return alert("No data found in this result")

    let settings = {
      fileName: `Extracted_Excel_${rawData.public_id}`,
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    }

    xlsx(extractedData, settings)
}