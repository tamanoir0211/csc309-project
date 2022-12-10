#!/bin/bash
source backend/venv/bin/activate
python backend/TFC/manage.py runserver  & cd tfc && npm start && fg
