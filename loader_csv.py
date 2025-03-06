import csv
csv_file = "./file.csv"
json = ''
with open(csv_file, newline='') as file:

    reader = csv.reader(file, delimiter=',', quotechar='"')

    for row in reader:
      
      json += '{ "q": "'+row[1]+'", "a": ['

      for i in range(2,5):
         json += '"'+row[i]+'",'
      json += '], "correct": '+ str(row[5]) +'},'

print(json)