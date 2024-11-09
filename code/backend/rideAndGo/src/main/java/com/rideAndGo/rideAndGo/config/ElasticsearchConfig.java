package com.rideAndGo.rideAndGo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.rideAndGo.rideAndGo.repositories")
public class ElasticsearchConfig {
    // Autres configurations spécifiques à Elasticsearch si nécessaire
}
