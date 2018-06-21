import * as Excel from 'exceljs/dist/exceljs.min.js'
import { saveAs } from 'file-saver'

export default {
  name: 'excel-export',
  methods: {
    makeExcel (columns, rows, sheetname, filename) {
      // 创建一个文件
      var workbook = new Excel.Workbook()
      workbook.creator = 'BertaData-API'
      workbook.lastModifiedBy = 'BertaData-API'
      workbook.created = new Date()
      workbook.modified = new Date()
      // 创建一个工作组
      var sheet = workbook.addWorksheet(sheetname)
      // 创建列
      sheet.columns = columns
      // 创建行
      sheet.addRows(rows)
      workbook.xlsx.writeBuffer(filename).then((data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' })
        saveAs(blob, filename)
      })
    }
  }
}
