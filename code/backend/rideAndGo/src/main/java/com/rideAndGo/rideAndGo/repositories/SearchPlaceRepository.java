package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.SearchPlace;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchPlaceRepository extends ElasticsearchRepository<SearchPlace, String> {

    // Utilisation du wildcard pour la recherche d'un terme à tout endroit du champ "name"
    List<SearchPlace> findByNameLike(String name);  // Par exemple 'findByNameLike("*Nat*")'
}
