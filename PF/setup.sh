#!/bin/bash
python3 -m venv ./backend/venv
source backend/venv/bin/activate
python3 -m pip install -r ./backend/requirements.txt
python3 backend/TFC/manage.py migrate
python3 backend/TFC/manage.py createsuperuser
cd tfc/
npm i
