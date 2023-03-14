import boto3
import csv
import datetime
import os
import psycopg2

def lambda_handler(event, context):
    # Obter os parâmetros bucket_name e object_key da requisição HTTP
    bucket_name = event['bucket_name']
    object_key = event['object_key']
    
    # Conectar-se ao S3 e baixar o arquivo CSV
    s3 = boto3.client('s3')
    file = s3.get_object(Bucket=bucket_name, Key=object_key)
    
    # Decodificar o conteúdo do arquivo como UTF-8
    file_content = file['Body'].read().decode('utf-8')
    
    # Ler o conteúdo do arquivo CSV usando a biblioteca csv do Python
    csv_reader = csv.DictReader(file_content.splitlines())
    
    # Configurar a conexão com o banco de dados Postgres
    db_host = os.environ['DB_HOST']
    db_port = os.environ['DB_PORT']
    db_name = os.environ['DB_NAME']
    db_user = os.environ['DB_USER']
    db_password = os.environ['DB_PASSWORD']
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        dbname=db_name,
        user=db_user,
        password=db_password
    )
    cur = conn.cursor()
    
    # Iterar sobre as linhas do arquivo CSV e inserir no banco de dados
    for row in csv_reader:
        # Tratar campos de cpf e cnpj removendo a máscara
        row['cpf'] = row['cpf'].replace('.', '').replace('-', '')
        row['cnpj'] = row['cnpj'].replace('.', '').replace('/', '').replace('-', '')
        
        # Tratar colunas de data no padrão yyyy-MM-dd
        for date_col in ['data_nascimento', 'data_cadastro']:
            if row[date_col]:
                date_obj = datetime.datetime.strptime(row[date_col], '%d/%m/%Y')
                row[date_col] = date_obj.strftime('%Y-%m-%d')
        
        # Inserir a linha no banco de dados
        cur.execute("""
            INSERT INTO tabela_exemplo (campo1, campo2, cpf, cnpj, data_nascimento, data_cadastro)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            row['campo1'],
            row['campo2'],
            row['cpf'],
            row['cnpj'],
            row['data_nascimento'],
            row['data_cadastro']
        ))
    
    # Commit das mudanças e fechamento da conexão com o banco de dados
    conn.commit()
    cur.close()
    conn.close()
    
    # Retornar uma mensagem de sucesso
    return {
        'statusCode': 200,
        'body': 'Dados salvos com sucesso no banco de dados'
    }
