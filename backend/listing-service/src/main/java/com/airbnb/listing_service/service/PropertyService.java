package com.airbnb.listing_service.service;

import com.airbnb.listing_service.dto.PropertyDto;
import com.airbnb.listing_service.dto.UserDto;
import com.airbnb.listing_service.feing.GetUserService;
import com.airbnb.listing_service.model.Property;
import com.airbnb.listing_service.model.PropertyPhotos;
import com.airbnb.listing_service.repository.PropertyRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private GetUserService getUserService;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public PropertyDto addProperty(String email,PropertyDto propertyDto){
        UserDto userDto = this.getUserService.getCurrentUserDetials(email);
        propertyDto.setHost_id(userDto.getId());
        propertyDto.setStatus("ACTIVE");
        Property property = this.PropertyDtoToProperty(propertyDto);
        if(property.getPhotos() != null){
            for(PropertyPhotos photos: property.getPhotos()){
                photos.setProperty(property);
            }
        }
        Property property1 = this.propertyRepository.save(property);
        return this.PropertyToPropertyDto(property1);
    }


    public Property PropertyDtoToProperty(PropertyDto propertyDto){
        return this.modelMapper.map(propertyDto, Property.class);
    }

    public PropertyDto PropertyToPropertyDto(Property property){
        return this.modelMapper.map(property, PropertyDto.class);
    }
}
