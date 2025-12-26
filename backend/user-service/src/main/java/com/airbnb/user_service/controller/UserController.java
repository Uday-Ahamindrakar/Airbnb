package com.airbnb.user_service.controller;

import com.airbnb.user_service.model.User;
import com.airbnb.user_service.payload.UserDto;
import com.airbnb.user_service.repository.UserRepository;
import com.airbnb.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
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

 @PreAuthorize("hasRole('HOST') or hasRole('USER')")
 @PatchMapping("/updateGuest/{id}")
 public  ResponseEntity<UserDto> updateGuest(@PathVariable Long id,@RequestBody UserDto userDto){
     System.out.println("Update user");
     System.out.println( userDto.getName());
     UserDto userDto1 = this.userService.updateGuest(id, userDto);
         return ResponseEntity.status(HttpStatus.OK).body(userDto1);
 }



 @PostMapping("/addHost")
 public ResponseEntity<String> addHost(@Valid @RequestBody UserDto userDto, BindingResult result){
     User checkUserExistsOrNot= this.userRepository.findByEmail(userDto.getEmail());

     if(result.hasErrors()){
         return ResponseEntity.badRequest().body(Objects.requireNonNull(result.getFieldError()).getDefaultMessage());
     }
     if(checkUserExistsOrNot != null &&  checkUserExistsOrNot.getEmail().contains(userDto.getEmail()) ){
         return ResponseEntity.status(HttpStatus.OK).body("Account with the given email exists in the database :(");
     }
     String responseStatus = this.userService.addHost(userDto);
     return ResponseEntity.status(HttpStatus.CREATED).body(responseStatus);
 }

    @PostMapping("/login")
    public String login(@RequestBody UserDto userDto){
        String result = this.userService.verify(userDto);
        return result;
    }
//@PostMapping("/login")
//public ResponseEntity<?> login(@RequestBody UserDto userDto) {
//
//    // Generate JWT
//    String jwt = this.userService.verify(userDto); // returns JWT
//
//    // Create HTTP-only cookie
//    ResponseCookie cookie = ResponseCookie.from("access_token", jwt)
//            .httpOnly(true)          // cannot access via JS
//            .secure(false)           // true in production (HTTPS)
//            .sameSite("Strict")      // CSRF protection
//            .path("/")
//            .maxAge(30 * 60)         // 30 minutes
//            .build();
//
//    return ResponseEntity.ok()
//            .header(HttpHeaders.SET_COOKIE, cookie.toString())
//            .body("Login successful");
//}

//    @PostMapping("/logout")
//    public ResponseEntity<?> logout() {
//
//        ResponseCookie cookie = ResponseCookie.from("access_token", "")
//                .httpOnly(true)
//                .secure(false)
//                .path("/")
//                .maxAge(0)
//                .build();
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, cookie.toString())
//                .body("Logged out");
//    }

 @PreAuthorize("hasRole('ADMIN')")
 @GetMapping("/getAllUsers")
 public List<User> getAllUsers(){
     return this.userService.getAllUsers();
 }

// @PreAuthorize("hasAnyRole('ADMIN', 'HOST', 'USER')")
 @PreAuthorize("hasRole('ADMIN') or hasRole('HOST') or hasRole('USER')")
 @GetMapping("/user/{email}")
 public User getCurrentUserDetials(@PathVariable String email){
     return this.userService.findByEmail(email);
 }

 @GetMapping("/hostName/{id}")
 public String getHostName(@PathVariable Long id){

     return this.userService.getHostName(id);
 }
}
