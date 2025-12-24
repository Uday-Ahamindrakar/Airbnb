package com.airbnb.user_service.service;

import com.airbnb.user_service.model.Role;
import com.airbnb.user_service.model.User;
import com.airbnb.user_service.payload.UserDto;
import com.airbnb.user_service.repository.RoleRepository;
import com.airbnb.user_service.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.authentication.PasswordEncoderParser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    private JwtService jwtService;

    public String addGuest(UserDto userDto){

            User user = this.userDtoToUser(userDto);


            user.setPassword(passwordEncoder.encode(user.getPassword()));

            if(user.getRoles() == null) {
                user.setRoles(new HashSet<>());
            }
            Role guestRole = roleRepository.findByRoleName("ROLE_USER");
            user.getRoles().add(guestRole);
            User user1 = userRepository.save(user);
            return "Guest account successfully created :)";
    }

    @Transactional
    public UserDto updateGuest(Long id, UserDto userDto){
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found :("));

        if (userDto.getName() != null) user.setName(userDto.getName());
        if (userDto.getEmail() != null) user.setEmail(userDto.getEmail());
        if (userDto.getPhone() != null) user.setPhone(userDto.getPhone());
        if (userDto.getPassword() != null && !userDto.getPassword().isBlank())
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        User user1 = this.userRepository.save(user);
        System.out.println("User -> " + user1);
        return this.userToUserDto(user1);
    }

    public String addHost(UserDto userDto){
        User user = this.userDtoToUser(userDto);
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));

        if(user.getRoles() == null){
            user.setRoles(new HashSet<>());
        }

        Role hostRole = roleRepository.findByRoleName("ROLE_HOST");
        user.getRoles().add(hostRole);
        User user1 = userRepository.save(user);
        return "Host account successfully created :)";
    }

    public String verify(UserDto userDto){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDto.getEmail(),
                        userDto.getPassword()
                )
        );

        User savedUser = userRepository.findByEmail(userDto.getEmail());
        String role = savedUser.getRoles().iterator().next().getRoleName();

        return jwtService.generateToken(savedUser.getEmail(), role);
    }

//    public String getHostName(Long id){
//        Optional<User> user =  this.userRepository.findById(id);
//        if(user.isPresent()){
//            return user.get().getName();
//        }
//        return "User";
//    }

    public String getHostName(Long id) {
        return userRepository.findById(id)
                .map(User::getName)
                .orElseThrow(() -> new EntityNotFoundException(""+ id));
    }


    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    public User findByEmail(String email){
        return this.userRepository.findByEmail(email);
    }

    public UserDto userToUserDto(User user){
        return this.modelMapper.map(user, UserDto.class);
    }

    public User userDtoToUser(UserDto userDto){
        return this.modelMapper.map(userDto , User.class);
    }
}
