@echo off

start msedge http://localhost:8000/

start /B python -m http.server 8000