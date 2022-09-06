
from itertools import zip_longest
import  random
import csv


datalistSPH = []
dataListUOM = []
dataListUOC = []
dataListPDF = []
dataListUser = []
dataListCoreCpu = []
dataListCoreMemory = []

user ="62f3575ab51f8a773cde8ed1"


def main(payment):

    Submission = 0

    if (payment == "Single-Core"):
        Submission = 200
    elif (payment == "Dual-Core(2)"):
        Submission = 500
    elif (payment == "Quad-Core(4)"):
        Submission = 1000
    elif (payment == "Hexa-Core(6)"):
        Submission = 1500
    elif (payment == "Octa-Core(8)"):
        Submission = 4000


    sph1 = (Submission * 25) / 100
    sph2 = (Submission * 50) / 100
    sph3 = (Submission * 75) / 100
    sph4 = (Submission * 100) / 100


    for i in range(300):
        SPH = round(random.randint(1, int(Submission)))
        PDF = round(random.randint(0,1))
        dataListUser.append(user)
        dataListPDF.append(PDF)
        if( SPH>0 and SPH<=sph1):
            UOM = round(random.uniform(0,25),1)
            UOC = round(random.uniform(0,25),1)
            Core = round(random.randint(1,2))
            dataListCoreCpu.append(Core)
            datalistSPH.append(SPH)
            dataListUOM.append(UOM)
            dataListUOC.append(UOC)
        elif((SPH>sph1 and SPH<=sph2)):
            UOM = round(random.uniform(25, 50), 1)
            UOC = round(random.uniform(25, 50), 1)
            Core = round(random.randint(2, 4))
            dataListCoreCpu.append(Core)
            datalistSPH.append(SPH)
            dataListUOM.append(UOM)
            dataListUOC.append(UOC)
        elif(SPH>sph2 and SPH<=sph3):
            UOM = round(random.uniform(50, 75), 1)
            UOC = round(random.uniform(50, 75), 1)
            Core = round(random.randint(4, 6))
            dataListCoreCpu.append(Core)
            datalistSPH.append(SPH)
            dataListUOM.append(UOM)
            dataListUOC.append(UOC)
        elif(SPH>sph3 and SPH<=sph4):
            UOM = round(random.uniform(75, 100), 1)
            UOC = round(random.uniform(75, 100), 1)
            Core = round(random.randint(6, 8))
            dataListCoreCpu.append(Core)
            datalistSPH.append(SPH)
            dataListUOM.append(UOM)
            dataListUOC.append(UOC)

        myfile = open('dataSet.csv', 'r+')
        myfile.truncate(0)
        myfile.close()

        d = [dataListUser, datalistSPH, dataListUOM, dataListUOC, dataListPDF,dataListCoreCpu]
        export_data = zip_longest(*d, fillvalue='')
        with open('dataSet.csv', 'w', encoding="ISO-8859-1", newline='') as myfile:
            wr = csv.writer(myfile)
            wr.writerow(("UserId", "SPH", "UOM", "UOC", "PDF","CORE"))
            wr.writerows(export_data)
        myfile.close()

    dataListUser.clear()
    datalistSPH.clear()
    dataListUOM.clear()
    dataListUOC.clear()
    dataListPDF.clear()
    dataListCoreCpu.clear()

# dakikada kaç submission aldığı
# kullandığı memory
# kullandığı cpu
# almak istediği submission
# ne kadar memory
# ne kadar cpu






