# Python program to create
# a pdf file

import os
from fpdf import FPDF
from memory_profiler import profile

# save FPDF() class into a
# variable pdf
pdf = FPDF()

# Add a page
pdf.add_page()

# set style and size of font
# that you want in the pdf
pdf.set_font("Arial", size=15)

# create a cell
pdf.cell(200, 10, txt="AIOPS",
         ln=1, align='C')
# add another cell
pdf.cell(200, 10, txt="Jotform AIOPS Project",
         ln=2, align='C')
# save the pdf with name .pdf
@profile
def  my_func():
    pdf.output("GFG.pdf")

my_func()
b = os.path.getsize("GFG.pdf")
print(b)

