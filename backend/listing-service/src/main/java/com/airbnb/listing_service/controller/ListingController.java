package com.airbnb.listing_service.controller;

import com.airbnb.listing_service.dto.PropertyDto;
import com.airbnb.listing_service.dto.UserDto;
import com.airbnb.listing_service.feing.GetUserService;
import com.airbnb.listing_service.model.Property;
import com.airbnb.listing_service.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listing")
public class ListingController {

    @Autowired
    private GetUserService userService;

    @Autowired
    private PropertyService propertyService;



    @PostMapping("/add-property")
    public ResponseEntity<String> addProperty(@RequestHeader("X-User-Id") String email, @RequestHeader("X-User-Role") String role, @RequestBody PropertyDto propertyDto){

        if(role.equals("ROLE_HOST")){

            PropertyDto propertyDto1 = this.propertyService.addProperty(email,propertyDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Property has been successfully added :)");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You're not allowed add property :(");
    }

    @GetMapping("/active-host-all-properties")
    public ResponseEntity<List<PropertyDto>> activeHostAllProperties(@RequestHeader("X-User-Id") String email, @RequestHeader("X-User-Role") String role){
        if(role.equals("ROLE_HOST")){
            List<PropertyDto> properties = this.propertyService.getPropertiesByHostId(email);
            if(!properties.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(properties);
            }
            else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/getAllUsers")
    public List<UserDto> getAllUsers(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/getUserDetails")
    public UserDto getUserDetails(@RequestHeader("X-User-Id") String email){

       return this.userService.getCurrentUserDetials(email);
    }

}
