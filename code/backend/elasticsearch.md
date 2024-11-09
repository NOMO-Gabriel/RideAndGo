# Installation de Elasticsearch
**Installation avec docker**

        docker pull elasticsearch:7.10.1

**Création d'un conteneur**

        docker run --name search-container -d -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.10.1

