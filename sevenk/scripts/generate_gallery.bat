@echo off
python scripts\generate_gallery.py
if %ERRORLEVEL% NEQ 0 pause
