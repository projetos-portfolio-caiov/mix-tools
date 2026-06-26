import sys
import json
import time
import matplotlib.pyplot as plt
from io import BytesIO
import requests
import math

def atualizacaoImagem(capturas, dados_brutos, componente):

    usuario = dados_brutos['usuario']
    
    linha1 = []
    linha2 = []
    momentos = []
    
    maisAlto = 0
    maisBaixo = 0
    primeiraVolta = True
    for captura in capturas:
        linha1.append(captura["captura"])
        if captura['limite'] != 'none':
            linha2.append(captura["limite"])
        else:
            linha2.append(0)
        momentos.append(captura["segundo"])
        
        if (captura["captura"] >= captura["limite"] and captura["captura"] > maisAlto) or primeiraVolta:
            maisAlto = captura['captura']
        elif (captura["captura"] < captura["limite"] and captura["limite"] > maisAlto) or primeiraVolta:
            maisAlto = captura['limite']

        if (captura["captura"] >= captura["limite"] and captura["captura"] < maisBaixo) or primeiraVolta:
            maisBaixo = captura['captura']
        elif (captura["captura"] < captura["limite"] and captura["limite"] < maisBaixo) or primeiraVolta:
            maisBaixo = captura['limite']
        
        primeiraVolta = False

    maisAlto = math.ceil(maisAlto * 1.1)
    maisBaixo = math.floor(maisBaixo * 0.8)

    plt.figure()
    plt.plot(momentos, linha1, marker = 'o', linestyle = "-", label = "Captura", color= "blue")
    plt.plot(momentos, linha2, marker = 'o', linestyle = "-", label = "Limite", color = "red")
    plt.legend()
    plt.ylim(maisBaixo, maisAlto)
    plt.xlabel("Horário")
    plt.ylabel(f"Captura ({componente['metrica']})")
    plt.title(f"Capturas de {componente['medida']} das {momentos[0]} às {momentos[len(momentos) - 1]}")
    plt.grid(True)

    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plt.close()
    
    try:
        response = requests.post(
                "http://localhost:3000/upload",
                files ={'image': (f'grafico{usuario}.png', buffer, 'image/png')})
        print(f'Enviado! Status de envio: {response} \n Gráfico enviado com sucesso!')
    except Exception as e:
        print(f'Erro ao enviar: {e}')

def pesquisaBinaria(lista, momento):
    inn = 0
    fnn = len(lista) - 1
    momento = f"{momento}:00" 
    
    while inn <= fnn:
        meio = math.floor((inn + fnn) / 2)
        termo = lista[meio]['dataHora'].split(" ")[1]
        
        if termo == momento:
            return meio
        elif termo > momento:
            fnn = meio - 1
        else:
            inn = meio + 1
    
    return fnn

def verificarComponente(componente):

    tipos = []
    tipos.append({"componente": "CPUP", "valor": "valorCpuPercent", "limite": "limiteCpuPercent", "metrica": "%", "medida": "Porcentagem da CPU"})
    tipos.append({"componente": "CPUF", "valor": "valorCPUFreq", "limite": "limiteCPUFreq", "metrica": "Hz", "medida": "Frequência da CPU"})
    tipos.append({"componente": "RAMD", "valor": "valorRAMDisponivel", "limite": "none", "metrica": "MB", "medida": "Memória Disponível"})
    tipos.append({"componente": "RAMP", "valor": "valorRAMPercentual", "limite": "limiteRAMPercentual", "metrica": "%", "medida": "Porcentagem da RAM"})
    tipos.append({"componente": "DISKT", "valor": "valorDISKTotal", "limite": "none", "metrica": "MB", "medida": "Armazenamento Total"})
    tipos.append({"componente": "DISKD", "valor": "valorDISKDisponivel", "limite": "none", "metrica": "MB", "medida": "Armazenamento Disponível"})
    tipos.append({"componente": "DISKP", "valor": "valorDISKPercentual", "limite": "limiteDISKPercentual", "metrica": "%", "medida": "Porcentagem de Armazenamento Utilizado"})
    tipos.append({"componente": "REDER", "valor": "valorREDERecebida", "limite": "limiteREDERecebida", "metrica": "Mbps", "medida": "Pacotes Recebidos"})
    tipos.append({"componente": "REDEE", "valor": "valorREDEEnviada", "limite": "limiteREDEEnviada", "metrica": "Mbps", "medida": "Pacotes Enviados"})
    tipos.append({"componente": "PRCD", "valor": "valorPROCESSODesativado", "limite": "limitePROCESSODesativado", "metrica": "Bytes", "medida": "Bytes de Processos Desativados"})
    tipos.append({"componente": "PRCA", "valor": "valorPROCESSOAtivos", "limite": "limitePROCESSOAtivos", "metrica": "Bytes", "medida": "Bytes de Processos Ativos"})
    tipos.append({"componente": "PRCT", "valor": "valorPROCESSOTotal", "limite": "none", "metrica": "Bytes", "medida": "Total de Bytes de Processos"})

    acesso = {d['componente']: d for d in tipos}
    json = acesso[componente]
    return json

def tratamentoJson(envio, dados_brutos):
    inicio = dados_brutos['inicio']
    fim = dados_brutos['fim']
    velocidade = dados_brutos['velocidade']
    componente = dados_brutos['componente']

    componente = verificarComponente(componente)
    
    inicio = pesquisaBinaria(envio, inicio)
    fim = pesquisaBinaria(envio, fim)
    
    if velocidade == "1x":
        velocidade = 5
    elif velocidade == "2x":
        velocidade = 2.5
    elif velocidade == "0.5x":
        velocidade = 10
    
    capturas = []
    
    while inicio < fim:
    
        captura = envio[inicio][componente['valor']]
        limite = envio[inicio][componente['limite']]
        segundo = envio[inicio]['dataHora'].split(" ")[1]
        
        registro = {"captura": captura, "limite": limite, "segundo": segundo}
        capturas.append(registro)
        
        if len(capturas) > 6:
            capturas.remove(capturas[0])
        atualizacaoImagem(capturas, dados_brutos, componente)
        
        
        inicio += 1
        time.sleep(velocidade)

def gerar(dados):
    
    idMaquina = dados['idMaquina']
    dataFormatada = dados['data'].split("-")
    dataFinal = f"{dataFormatada[2]}-{dataFormatada[1]}-{dataFormatada[0]}"

    try:
        envio = requests.get(f"https://v628rlk7v0.execute-api.us-east-1.amazonaws.com/TESTE1GUI/bclientstreamline/ATM_{idMaquina}/{dataFinal}/{dataFinal}/tempoReal")
    except Exception as e:
        print(f'Erro: {e}')

    tratamentoJson(envio.json(), dados)

if __name__ == "__main__":
    entrada = sys.stdin.read()
    dados = json.loads(entrada)
    gerar(dados)
