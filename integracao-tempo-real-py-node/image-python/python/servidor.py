import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import socket

app = Flask(__name__)
CORS(app)

@app.route("/recebimento", methods=["POST"])
def carregarRequisicao():
    dados_brutos = request.get_json()

    try:
        process = subprocess.Popen(
            ["python", "exec.py"],
            stdin=subprocess.PIPE,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            text=True
        )

        json_dados = json.dumps(dados_brutos)
        process.stdin.write(json_dados)
        process.stdin.close()
        return jsonify({"status": "executando"}), 202
    except Exception as e:
        print(f'Erro: {e}')
    
    return "tste"

if __name__ == '__main__':
    hostname = socket.gethostname()
    ipv4 = socket.gethostbyname(hostname)
    print(ipv4)
    app.run(debug=False, port=5000, threaded=True)