import openpyxl
wb = openpyxl.load_workbook('./Excel.xlsx',data_only=True)
fs = wb.active
fs_count_row = fs.max_row 
fs_count_col = 4
json = '['
for row in range(1,fs_count_row+1):
    correct = 0
    json += '{ "q": "' + fs.cell(column=1, row=row).value + '", "a": ['
    for column in range(2,fs_count_col+1):
        cell = fs.cell(column=column, row=row)
        bgColor = cell.fill.bgColor.index
        if bgColor!='00000000' :
            correct = column - 1
        json += '"' + cell.value + '"'

        if column != fs_count_col: 
            json += ','
    json += '], "correct": "'+ str(correct) +'"}'
    if row != fs_count_row:
        json += ','
json += ']'
file = open("./questions.json", "a")
file.write(json)
file.close()
