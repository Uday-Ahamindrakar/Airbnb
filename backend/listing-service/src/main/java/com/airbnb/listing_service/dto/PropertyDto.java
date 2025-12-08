package com.airbnb.listing_service.dto;

import com.airbnb.listing_service.model.PropertyPhotos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PropertyDto {

     Long id;
     @NotBlank(message = "Title cannot be empty")
     @NotNull
     @Size(min = 5, message = "Title must be at least 5 charters long")
     private String title;

     @NotBlank(message = "Description cannot be blank")
     private String description;

     @NotBlank(message = "City cannot be empty")
     @NotNull
     private String city;

     @NotBlank(message = "Address cannot be empty")
     @NotNull
     private String address;

     @NotBlank(message = "Country cannot be empty")
     @NotNull
     private String country;

     @NotNull
     private double price_per_night;

     @NotNull
     private int max_guest;


     private Long hostId;


     private String status;

     private List<PropertyPhotoDto> photos;

}
