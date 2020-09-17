#!/usr/local/bin/python3
from pygrok import Grok
import json
import sys
from elasticsearch import Elasticsearch
from elasticsearch import helpers
from elasticsearch.client import indices
from collections import deque
import argparse
#
# Argumentos obrigatorios
#
parser = argparse.ArgumentParser(description='Importa Junta')
parser.add_argument('nomearq', type=str, help='Nome do Arquivo para Importar')
parser.add_argument('num_resume', type=int, help='Linha do arquivo para comecar a importar')
parser.add_argument('lote', type=int, help='Lote quantidade de BULK para Elastic')
parser.add_argument('es_index', type=str, help='Index do elastic search a ser usado')
#
args = parser.parse_args()
#
nomearq=args.nomearq
num_resume=args.num_resume
lote=args.lote
es_index=args.es_index
#
es = Elasticsearch('http://elastic:changeme@10.0.18.30:9200')
obj={}
actions=[]
#
#
pattern_tipo_0="(?<junta_tipo_registro>.{1})(?<indicador_full_diario>.{1})(?<junta_tipo_atualiz>.{1})(?<junta_cnpj>.{14})(?<principal_identificador_matriz_filial>.{1})(?<principal_razao_social_nome_empresarial>.{150})(?<principal_nome_fantasia>.{55})(?<principal_situacao_cadastral>.{2})(?<principal_dt_situacao_cadastral>.{8})(?<principal_motivo_situacao_cadastral>.{2})(?<principal_nm_cidade_exterior>.{55})(?<principal_cod_pais>.{3})(?<principal_nm_pais>.{70})(?<principal_cod_natureza_juridica>.{4})(?<principal_dt_inicio_atividade>.{8})(?<principal_cnae_fiscal>.{7})(?<principal_descricao_tipo_logradouro>.{20})(?<principal_logradouro>.{60})(?<principal_logradouro_numero>.{6})(?<principal_logradouro_complemento>.{156})(?<principal_logradouro_bairro>.{50})(?<principal_logradouro_cep>.{8})(?<principal_logradouro_uf>.{2})(?<principal_cod_municipio>.{4})(?<principal_municipio>.{50})(?<principal_telefone_1_ddd>.{04})(?<principal_telefone_1_numero>.{08})(?<principal_telefone_2_ddd>.{04})(?<principal_telefone_2_numero>.{08})(?<principal_fax_1_ddd>.{04})(?<principal_fax_1_numero>.{08})(?<principal_correio_eletronico>.{115})(?<principal_qualificacao_responsavel>.{2})(?<principal_capital_social>.{14})(?<principal_porte_empresa>.{2})(?<principal_opcao_pelo_simples>.{1})(?<principal_dt_opcao_pelo_simples>.{8})(?<principal_dt_exclusao_pelo_simples>.{8})(?<principal_opcao_pelo_mei>.{1})(?<principal_situacao_especial>.{23})(?<principal_dt_situacao_especial>.{8})(?<filler>.{243})(?<fim_registro>.{1})"
pattern_tipo_1="(?<junta_tipo_registro>.{1})(?<indicador_full_diario>.{1})(?<junta_tipo_atualiz>.{1})(?<junta_cnpj>.{14})(?<principal_identificador_matriz_filial>.{1})(?<principal_razao_social_nome_empresarial>.{150})(?<principal_nome_fantasia>.{55})(?<principal_situacao_cadastral>.{2})(?<principal_dt_situacao_cadastral>.{8})(?<principal_motivo_situacao_cadastral>.{2})(?<principal_nm_cidade_exterior>.{55})(?<principal_cod_pais>.{3})(?<principal_nm_pais>.{70})(?<principal_cod_natureza_juridica>.{4})(?<principal_dt_inicio_atividade>.{8})(?<principal_cnae_fiscal>.{7})(?<principal_descricao_tipo_logradouro>.{20})(?<principal_logradouro>.{60})(?<principal_logradouro_numero>.{6})(?<principal_logradouro_complemento>.{156})(?<principal_logradouro_bairro>.{50})(?<principal_logradouro_cep>.{8})(?<principal_logradouro_uf>.{2})(?<principal_cod_municipio>.{4})(?<principal_municipio>.{50})(?<principal_telefone_1_ddd>.{04})(?<principal_telefone_1_numero>.{08})(?<principal_telefone_2_ddd>.{04})(?<principal_telefone_2_numero>.{08})(?<principal_fax_1_ddd>.{04})(?<principal_fax_1_numero>.{08})(?<principal_correio_eletronico>.{115})(?<principal_qualificacao_responsavel>.{2})(?<principal_capital_social>.{14})(?<principal_porte_empresa>.{2})(?<principal_opcao_pelo_simples>.{1})(?<principal_dt_opcao_pelo_simples>.{8})(?<principal_dt_exclusao_pelo_simples>.{8})(?<principal_opcao_pelo_mei>.{1})(?<principal_situacao_especial>.{23})(?<principal_dt_situacao_especial>.{8})(?<filler>.{243})(?<fim_registro>.{1})"
pattern_tipo_2="(?<junta_tipo_registro>.{1})(?<indicador_full_diario>.{1})(?<junta_tipo_atualiz>.{1})(?<junta_cnpj>.{14})(?<socio_identificador_socio>.{1})(?<socio_nome>.{150})(?<socio_cpf_cnpj>.{14})(?<socio_cod_qualificacao>.{2})(?<socio_percentual_capital_social>.{5})(?<socio_dt_entrada_sociedade>.{8})(?<socio_codigo_pais>.{3})(?<socio_nome_pais>.{70})(?<socio_cpf_representante_legal>.{11})(?<socio_nome_representante>.{60})(?<socio_cod_qualificacao_representante_legal>.{2})(?<filler>.{856})(?<fim_registro>.{1})"
pattern_tipo_6="(?<junta_tipo_registro>.{1})(?<indicador_full_diario>.{1})(?<junta_tipo_atualiz>.{1})(?<junta_cnpj>.{14})(?<cnae_secundaria_1>.{7})(?<cnae_secundaria_2>.{7})(?<cnae_secundaria_3>.{7})(?<cnae_secundaria_4>.{7})(?<cnae_secundaria_5>.{7})(?<cnae_secundaria_6>.{7})(?<cnae_secundaria_7>.{7})(?<cnae_secundaria_8>.{7})(?<cnae_secundaria_9>.{7})(?<cnae_secundaria_10>.{7})(?<cnae_secundaria_11>.{7})(?<cnae_secundaria_12>.{7})(?<cnae_secundaria_13>.{7})(?<cnae_secundaria_14>.{7})(?<filler>.{1084})(?<fim_registro>.{1})"
#
nomearq_json=nomearq+'.json'
#
primeira_vez=True
escreve_elastic=False
#
#arquivo integral 
#nomearq='D:\\Projeto JUNTA COMERCIAL\\DADOS ABERTOS\\ano2020\\JULHO\DADOS_ABERTOS_CNPJ_02\\K3241.K03200DV.D00703.L00002'
# colocar linha exata diminuindo 1 abaixo
#num_resume=3565233
#lote=3000
#
#
obj['principal']=[]    
obj['socio']=[]
obj['cnae']=[]
#
count_principal=0
count_socio=0
count_cnae=0 
#
count=0
#
with open(nomearq,errors="ignore") as f:
   for num,line in enumerate(f, 1):       
       if num > num_resume:  
            #                                  
            coluna = line.split()        
            #
            if coluna[0] == "0F":
               pGrok=Grok(pattern_tipo_0)
            elif coluna[0]=="1F":
               pGrok=Grok(pattern_tipo_1)
            elif coluna[0]=="2F":
               pGrok=Grok(pattern_tipo_2)
            elif coluna[0]=="6F":
               pGrok=Grok(pattern_tipo_6)            
            #                   
            lineGrok=pGrok.match(line)
            dados_json=json.dumps(lineGrok)
            dados_json_obj = json.loads(dados_json)        
            #
            #print (num)
            #print (dados_json_obj['junta_tipo_registro'])
            #
            # remove os campos
            #"filler","indicador_full_diario","fim_registro","tipo"            
            #  
            fim_registro=dados_json_obj['fim_registro']
            #
            if (not fim_registro=='F'):
               print ("Verificar ! Linha nao bate F no final da linha: " + str(count))
               break 
            #
            dados_json_obj.pop("filler")        
            dados_json_obj.pop("indicador_full_diario")
            dados_json_obj.pop("fim_registro")   
            #            #  
            tipo=dados_json_obj['junta_tipo_registro']                        
            dados_json_obj.pop("junta_tipo_registro")        
            dados_json_obj.pop("junta_tipo_atualiz")                       
            #
            if (tipo=='1'):
               #            
               if (primeira_vez):
                     obj['principal']=dados_json_obj
                     primeira_vez=False
                     escreve_elastic=False
                     junta_cnpj=dados_json_obj['junta_cnpj']                                                                                     
                     dados_json_obj.pop("junta_cnpj")        
                     print("Iniciando....")
               #                        
               #
               if (escreve_elastic):  
                  #                                         
                  principal=obj['principal']                              
                  socio = obj['socio']
                  cnae = obj['cnae']
                  #
                  obj['principal']=[]
                  obj['socio']=[]
                  obj['cnae']=[]                                              
                  #               
                  count_principal=count_principal+len(principal)
                  count_socio=count_socio + len(socio)
                  count_cnae=count_cnae + len(cnae)                              
                  #
                  if len(socio) > 0 and len(cnae)>0:                  
                     action = {
                              "_index":  es_index,  
                                          "_id" : junta_cnpj,                                 
                                          "principal":principal,
                                          "socio":socio,          
                                          "cnae": cnae,       
                                          "junta_cnpj":junta_cnpj
                     }                   
                     #print("Inserindo CNPJ: " + junta_cnpj + " socios: " + str(len(socio)) + " cnae: " + str(len(cnae)))                                      
                  elif len(socio) > 0:                    
                        action = {
                              "_index": es_index, 
                              "_id" : junta_cnpj,                                                 
                              "principal":principal,
                              "socio":socio,                                  
                              "junta_cnpj":junta_cnpj
                                 }      
                        #print("Acumulando CNPJ: " + junta_cnpj + " socios: " + str(len(socio)) + " cnae: 0")                                      
                  elif len(cnae) > 0:                    
                        action = {
                                 "_index": es_index,   
                                 "_id" : junta_cnpj,                                             
                                 "principal":principal,
                                 "cnae":cnae,                                  
                                 "junta_cnpj": junta_cnpj
                                 }        
                        #print("Acumulando CNPJ: " + junta_cnpj + " socios: 0 cnae: " + str(len(cnae)))                                      
                  else:                     
                        action = {
                              "_index": es_index,  
                              "_id" : junta_cnpj,                                                
                              "principal":principal,
                              "junta_cnpj":junta_cnpj
                        }                                       
                        #print("Acumulando em memória CNPJ: " + junta_cnpj + " socios: 0  cnae: 0")                                      
                  #
                  actions.append(action)    
                  #
                  if (len(actions) == lote):
                     print ("Inserindo CNPJs No Elasticsearch...."+ str(lote))
                     #
                     deque(helpers.parallel_bulk(es,actions, request_timeout=30, refresh="wait_for"), maxlen=0)                                                                         
                     print ("Inserido ! Numero da Linha atual: " + str(num))
                     #
                     q={
                        "arquivo": nomearq_json,
                        "count_tipo_1_principal": count_principal,
                        "count_tipo_2_socio": count_socio,
                        "count_tipo_6_cnae": count_cnae,                  
                        "ultimo cnpj inserido": junta_cnpj,
                        "linha_ultima_lida": num
                     }
                     #
                     with open(nomearq_json,'w') as json_file_log:
                           json.dump(q,json_file_log)
                           json_file_log.write 
                           json_file_log.close
                     # 
                     actions=[]                 
                     #                 
                  #    
                  obj['principal']=[]   
                  #               
                  junta_cnpj=dados_json_obj['junta_cnpj']                                                                      
                  dados_json_obj.pop("junta_cnpj")        
                  # 
                  obj['principal']=dados_json_obj
                  #
                  #print('Cnpj nesta linha: ' + junta_cnpj + ' Numero da linha não inserida ultima linha:' + str(num))             
               escreve_elastic=True   
            elif coluna[0]=="2F":   
               dados_json_obj.pop("junta_cnpj")  
               obj['socio'].append(dados_json_obj)      
            elif coluna[0]=="6F":   
               dados_json_obj.pop("junta_cnpj")              
               obj['cnae'].append(dados_json_obj)   
            #   
   if (len(obj['principal']) > 0): 
      #
      principal= obj['principal']                              
      socio = obj['socio']
      cnae = obj['cnae']
      #
      count_principal=count_principal+len(principal)
      count_socio=count_socio + len(socio)
      count_cnae=count_cnae + len(cnae)                              
      #
      if len(socio) > 0 and len(cnae)>0:                  
         action = {
                   "_index":  es_index,  
                   "_id" : junta_cnpj,                                 
                   "principal":principal,
                   "socio":socio,          
                   "cnae": cnae,       
                   "junta_cnpj":junta_cnpj
         }                       
      elif len(socio) > 0:                    
            action = {
                     "_index": es_index, 
                     "_id" : junta_cnpj,                                                 
                     "principal":principal,
                     "socio":socio,                                  
                     "junta_cnpj":junta_cnpj
            }      
      elif len(cnae) > 0:                    
            action = {
                     "_index": es_index,   
                     "_id" : junta_cnpj,                                             
                     "principal":principal,
                     "cnae":cnae,                                  
                     "junta_cnpj": junta_cnpj
            }        
      else:                     
            action = {
                     "_index": es_index,  
                     "_id" : junta_cnpj,                                                
                     "principal":principal,
                     "junta_cnpj":junta_cnpj
            }                                                         
      actions.append(action)    
      #
      print ("Inserindo CNPJs No Elasticsearch...."+ str(lote))
      #
      deque(helpers.parallel_bulk(es,actions, request_timeout=30, refresh="wait_for"), maxlen=0)                                                                         
      print ("Inserido ! Numero da Linha atual: " + str(num))
      #
      q={
            "arquivo": nomearq_json,
            "count_tipo_1_principal": count_principal,
            "count_tipo_2_socio": count_socio,
            "count_tipo_6_cnae": count_cnae,                  
            "ultimo cnpj inserido": junta_cnpj,
            "linha_ultima_lida": num+1
      }
      #
      with open(nomearq_json,'w') as json_file_log:
           json.dump(q,json_file_log)
           json_file_log.write             