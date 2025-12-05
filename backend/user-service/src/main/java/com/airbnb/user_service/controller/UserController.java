package com.airbnb.user_service.controller;

import com.airbnb.user_service.model.User;
import com.airbnb.user_service.payload.UserDto;
import com.airbnb.user_service.repository.UserRepository;
import com.airbnb.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class UserController {

 @Autowired
 private UserService userService;

 @Autowired
 private UserRepository userRepository;

 @PostMapping("/addGuest")
 public ResponseEntity<String> addGuest(@Valid @RequestBody UserDto userDto){

     User checkUserExistsOrNot= this.userRepository.findByEmail(userDto.getEmail());

     if(checkUserExistsOrNot != null &&  checkUserExistsOrNot.getEmail().contains(userDto.getEmail()) ){
         return ResponseEntity.status(HttpStatus.OK).body("Account with the given email exists in the database :(");
     }

         String result = this.userService.addGuest(userDto);
         return ResponseEntity.status(HttpStatus.CREATED).body(result);

 }

 @PostMapping("/addHost")
 public User addHost(@Valid @RequestBody User user){
     User user1 = this.userService.addHost(user);
     return user1;
 }

 @PreAuthorize("hasRole('ADMIN')")
 @GetMapping("/getAllUsers")
 public List<User> getAllUsers(){
     return this.userService.getAllUsers();
 }
}
