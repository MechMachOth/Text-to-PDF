
import tkinter as tk
from tkinter import filedialog
import fpdf
 
window = tk.Tk()
window.title("Text to PDF Converter")
 
text = tk.Text(window)
text.pack()

def convert_to_pdf():
    text_content = text.get("1.0", "end")
    pdf = fpdf.FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, txt=text_content)
    filepath = filedialog.asksaveasfilename(defaultextension=".pdf")
    pdf.output(filepath)

button = tk.Button(window, text="Convert to PDF", command=convert_to_pdf)
button.pack()
 
window.mainloop()
