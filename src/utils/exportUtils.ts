
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

type ExportFormat = "csv" | "json" | "xlsx";

export interface ExportOptions {
  filename: string;
  format: ExportFormat;
  data: any[];
}

/**
 * Converte um array de objetos para CSV formatado corretamente.
 */
function convertToCSV(data: any[]): string {
  if (data.length === 0) return "";

  // Obtém os cabeçalhos das colunas do primeiro objeto
  const headers = Object.keys(data[0]);

  // Formata a linha do cabeçalho no CSV
  const headerRow = headers.join(";");

  // Converte os dados para linhas CSV formatadas
  const rows = data.map((obj) =>
    headers
      .map((header) => {
        let value = obj[header];

        // Trata valores nulos ou indefinidos
        if (value == null) return "";

        // Garante que strings que contenham caracteres especiais sejam encapsuladas com aspas duplas
        if (typeof value === "string" && (value.includes(";") || value.includes('"') || value.includes("\n"))) {
          return `"${value.replace(/"/g, '""')}"`;
        }

        return value;
      })
      .join(";") // Usa `;` como delimitador para melhor compatibilidade no Excel
  );

  // Junta cabeçalhos e linhas de dados
  return ["\uFEFF" + headerRow, ...rows].join("\n");
}

/**
 * Converte um array de objetos para uma planilha Excel formatada com estilos.
 */
function convertToExcel(data: any[], filename: string) {
  // Cria a planilha a partir dos dados
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Define o estilo para as células de cabeçalho
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "0077B3" } }, // Azul escuro para cabeçalho
    alignment: { horizontal: "center" },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  };
  
  // Define o estilo para as linhas alternadas para melhorar a legibilidade
  const evenRowStyle = {
    fill: { fgColor: { rgb: "F2F2F2" } }, // Cinza claro para linhas pares
  };
  
  const oddRowStyle = {
    fill: { fgColor: { rgb: "FFFFFF" } }, // Branco para linhas ímpares
  };
  
  // Aplica estilos à planilha
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
  
  // Obtém a largura máxima de cada coluna
  const colWidths = [];
  for (let i = range.s.c; i <= range.e.c; i++) {
    let maxWidth = 10; // Largura mínima padrão
    for (let j = range.s.r; j <= range.e.r; j++) {
      const cell = worksheet[XLSX.utils.encode_cell({r: j, c: i})];
      if (cell && cell.v) {
        const cellText = String(cell.v);
        const width = cellText.length * 1.2; // Estimativa para largura adequada
        if (width > maxWidth) maxWidth = width;
      }
    }
    colWidths.push({ wch: maxWidth });
  }
  
  // Define as larguras das colunas
  worksheet['!cols'] = colWidths;
  
  // Adiciona estilos às células
  for (let i = range.s.r; i <= range.e.r; i++) {
    for (let j = range.s.c; j <= range.e.c; j++) {
      const cellRef = XLSX.utils.encode_cell({r: i, c: j});
      if (!worksheet[cellRef]) continue;
      
      // Cria uma nova célula com estilos
      const newCell = { ...worksheet[cellRef] };
      
      // Aplica estilos conforme a posição da célula
      if (i === range.s.r) {
        // Primeira linha (cabeçalho)
        newCell.s = headerStyle;
      } else if (i % 2 === 0) {
        // Linhas pares
        newCell.s = evenRowStyle;
      } else {
        // Linhas ímpares
        newCell.s = oddRowStyle;
      }
      
      // Atualiza a célula na planilha
      worksheet[cellRef] = newCell;
    }
  }
  
  // Cria o livro e adiciona a planilha
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  
  // Adiciona logo ou informações adicionais se necessário
  
  // Adiciona propriedades ao workbook para identificação
  workbook.Props = {
    Title: filename,
    Subject: "Dados exportados do Painel Port VR",
    Author: "Port VR Sistema",
    CreatedDate: new Date()
  };
  
  // Converte o workbook para um buffer binário
  const excelBuffer = XLSX.write(workbook, { 
    bookType: 'xlsx', 
    type: 'array',
    cellStyles: true
  });
  
  // Cria o blob e faz o download
  const blob = new Blob([excelBuffer], { 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
  });
  
  saveAs(blob, `${filename}.xlsx`);
}

/**
 * Exporta dados para CSV, JSON ou Excel e faz o download do arquivo.
 */
export function exportToFile({ filename, format, data }: ExportOptions) {
  if (!data || data.length === 0) {
    throw new Error("Não há dados para exportar");
  }

  try {
    if (format === "csv") {
      const csv = convertToCSV(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `${filename}.csv`);
    } else if (format === "xlsx") {
      convertToExcel(data, filename);
    } else if (format === "json") {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json;charset=utf-8" });
      saveAs(blob, `${filename}.json`);
    }
  } catch (error) {
    console.error("Erro ao exportar arquivo:", error);
    throw error;
  }
}
