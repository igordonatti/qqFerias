from flask import Flask, request
import requests
import sys

matricula = sys.argv[1]
mensagem = sys.argv[2]

data = {
  'messaging_type': 'UPDATE',
  'recipient': {
    'id': f'{matricula}'
  },
  'message': {
    'text': f'{mensagem}'
  }
}

url = "https://graph.facebook.com/v4.0/me/messages"
token = 'DQVJzbi1raTJheGV6Ump4NE5RYUVUTTZAwNGx5dmdJOE00VTRDUHR6RjVxdTdYOHYtaTcxQW9pVHBhOVhiTW9BQkdrU3A3dUdpOU1EQ0ZAfeU1HaHloSGZAuVGFNQkctSlhMVjJHUHZAMcU82OG90dG5heE9uLW9YSTlOdExBWU8zVnNybm5vMU5kMEFoalBDRUZAvNlkyVG5PSlhqWTEtaWZAyazJ3di0yTTJ1aEdmTG5JMTRTd0tUWFlpb3ctSWFDNndpUWh3OXdn'
headers = {
  'Authorization': f'Bearer {token}',
  'Content-Type': 'application/json'
}

response = requests.post(
  url,
  json=data,
  headers=headers
)

if response.status_code == 200:
  print("Mensagem enviada com sucesso!") 
else:
  print("Não foi possível enviar a mensagem. Erro: {}".format(response.text)) 
