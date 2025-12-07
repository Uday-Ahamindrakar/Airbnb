package com.airbnb.listing_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "property")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String city;

    private String address;

    private String country;

    private double price_per_night;

    private int max_guest;

    private Long host_id;

    @Enumerated(EnumType.STRING)
    private ListingStatus status;

    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<PropertyPhotos> photos = new ArrayList<>();

}
