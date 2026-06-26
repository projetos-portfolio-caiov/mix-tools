FROM python:3.10.17-alpine3.21
WORKDIR /
COPY ./python .
RUN pip install requests matplotlib flask flask-cors
EXPOSE 5000
CMD ["python", "servidor.py"]