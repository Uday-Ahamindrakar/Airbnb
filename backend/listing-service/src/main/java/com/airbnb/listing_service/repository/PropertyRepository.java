package com.airbnb.listing_service.repository;

import com.airbnb.listing_service.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property,Long> {

    List<Property> findByHostId(Long hostId);
}
