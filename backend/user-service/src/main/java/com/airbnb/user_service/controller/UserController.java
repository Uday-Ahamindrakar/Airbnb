package com.airbnb.user_service.controller;

import com.airbnb.user_service.model.User;
import com.airbnb.user_service.payload.UserDto;
import com.airbnb.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class UserController {

 @Autowired
 private UserService userService;

 @PostMapping("/addGuest")
 public ResponseEntity<UserDto> addGuest(@Valid @RequestBody UserDto userDto){
     UserDto userDto1 = this.userService.addGuest(userDto);
     return ResponseEntity.status(HttpStatus.CREATED).body(userDto1);
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
