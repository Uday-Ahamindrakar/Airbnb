package com.airbnb.listing_service.service;

import com.airbnb.listing_service.dto.PropertyDto;
import com.airbnb.listing_service.dto.UserDto;
import com.airbnb.listing_service.feing.GetUserService;
import com.airbnb.listing_service.model.ListingStatus;
import com.airbnb.listing_service.model.Property;
import com.airbnb.listing_service.model.PropertyPhotos;
import com.airbnb.listing_service.repository.PropertyRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private GetUserService getUserService;

    @Autowired
    private ModelMapper modelMapper;

//    @Transactional
//    public PropertyDto addProperty(String email,PropertyDto propertyDto){
//        UserDto userDto = this.getUserService.getCurrentUserDetials(email);
//        propertyDto.setHostId(userDto.getId());
//        propertyDto.setStatus("ACTIVE");
//        Property property = this.PropertyDtoToProperty(propertyDto);
//        if(property.getPhotos() != null){
//            for(PropertyPhotos photos: property.getPhotos()){
//                photos.setProperty(property);
//            }
//        }
//        Property property1 = this.propertyRepository.save(property);
//        return this.PropertyToPropertyDto(property1);
//    }

    @Transactional
    public PropertyDto addProperty(String email, PropertyDto propertyDto) {

        // get host details
        UserDto userDto = this.getUserService.getCurrentUserDetials(email);

        propertyDto.setId(null);

        propertyDto.setHostId(userDto.getId());

        propertyDto.setStatus(String.valueOf(ListingStatus.ACTIVE));

        Property property = this.PropertyDtoToProperty(propertyDto);

        if (property.getPhotos() != null) {
            for (PropertyPhotos photos : property.getPhotos()) {
                photos.setProperty(property);
            }
        }

        Property savedProperty = propertyRepository.save(property);
        return this.PropertyToPropertyDto(savedProperty);
    }

    public String deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            return "Property Does not Exist In The DB";
        }

        propertyRepository.deleteById(id);
        return "Property Deleted";
    }

    public List<PropertyDto> getPropertiesByHostId(String email) {
        UserDto userDto = getUserService.getCurrentUserDetials(email);

        return propertyRepository.findByHostId(userDto.getId()).stream()
                .map(property -> modelMapper.map(property, PropertyDto.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDto> getAllProperties(){
        List<Property> properties = this.propertyRepository.findAll();
        return properties.stream().map(property -> modelMapper.map(property, PropertyDto.class)).toList();
    }


    public Property PropertyDtoToProperty(PropertyDto propertyDto){
        return this.modelMapper.map(propertyDto, Property.class);
    }

    public PropertyDto PropertyToPropertyDto(Property property){
        return this.modelMapper.map(property, PropertyDto.class);
    }
}
