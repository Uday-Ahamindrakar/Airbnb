package com.airbnb.listing_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/listing")
public class ListingController {

    @GetMapping("/currentHost")
    public String getCurrentHost(@RequestHeader("X-User-Id") String email, @RequestHeader("X-User-Role") String role){

        if(role.equals("ROLE_HOST")){
            return "Genuine Host :)";
        }
        return "You're not allowed to check current host";
    }
}
