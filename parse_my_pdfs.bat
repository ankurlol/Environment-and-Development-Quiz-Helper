@echo off
echo ====================================================
echo Parsing all NPTEL PDF files in this folder...
echo ====================================================
python scripts/parse_pdf.py .
echo.
echo Done! Questions extracted into src/data/courseData.json
pause
