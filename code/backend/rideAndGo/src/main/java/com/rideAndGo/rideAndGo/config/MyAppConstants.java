package com.rideAndGo.rideAndGo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "myapp.constants")
public class MyAppConstants {
    private String appName;
    private String cassandraUrl;

    // Getters et Setters
    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getCassandraUrl() {
        return cassandraUrl;
    }

    public void setCassandraUrl(String cassandraUrl) {
        this.cassandraUrl = cassandraUrl;
    }
}
