# Installation de Elasticsearch
**Installation avec docker**

        docker pull docker.elastic.co/elasticsearch/elasticsearch:8.10.1


**Création d'un conteneur**

        docker run -d  --name=elasticsearch -p 9200:9200  -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.10.1


**verifier que elasticsearch est lance**
         docker ps (pour le conteneur)

et

           curl -X GET "localhost:9200"

tu devrais avoir un reponse similaire a ca:

                {
        "name" : "f597e0265c44",
        "cluster_name" : "docker-cluster",
        "cluster_uuid" : "4H1Gepk7T4Gv_KaHehdw8A",
        "version" : {
        "number" : "7.10.1",
        "build_flavor" : "default",
        "build_type" : "docker",
        "build_hash" : "1c34507e66d7db1211f66f3513706fdf548736aa",
        "build_date" : "2020-12-05T01:00:33.671820Z",
        "build_snapshot" : false,
        "lucene_version" : "8.7.0",
        "minimum_wire_compatibility_version" : "6.8.0",
        "minimum_index_compatibility_version" : "6.0.0-beta1"
        },
        "tagline" : "You Know, for Search"
        }

**crer l'index rideandgo**


         curl -X PUT "localhost:9200/rideandgo" -H "Content-Type: application/json" -d 
         
         '{
                        
                "settings": {
                "analysis": {
                "tokenizer": {
                        "lowercase_tokenizer": {
                        "type": "keyword"
                        }
                }

                },
                "number_of_shards": 1,
                "number_of_replicas": 1
                },

                "mappings": {
                "properties": {
                "id": { "type": "keyword" },
                "osmId": { "type": "long" },
                "name": { 
                        "type": "text",
                        "analyzer": "standard",  
                        "search_analyzer": "standard"  
                },

                "latitude": { "type": "double" },
                "longitude": { "type": "double" },
                "way": { "type": "text" },
                "description": { "type": "text" }
                }
                }
        }'


**verifier la creation**

        GET "localhost:9200/rideandgo?pretty"

**naviguez vers le repertoire ressources du projet**

```bash
        cd RideAndGo/code/backend/rideAndGo/src/main/resources
```
**Inserer les donnees des lieux dans la base de donees**
        curl -X POST "localhost:9200/_bulk" -H "Content-Type: application/json" --data-binary "@places.json"
**tester les recherches optimisees**
Par exemple, si je veux rechercher tous les `documents` dont le nom contient la lettre `N` j tape:

        curl -X GET "localhost:9200/rideandgo/_search?q=name:*N*"

si je veux contenant National, je tape plutot 

        curl -X GET "localhost:9200/rideandgo/_search?q=name:*N*"

Il s'agit juste de remplacer N par national
