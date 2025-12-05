package com.airbnb.user_service.service;

import com.airbnb.user_service.model.Role;
import com.airbnb.user_service.model.User;
import com.airbnb.user_service.payload.UserDto;
import com.airbnb.user_service.repository.RoleRepository;
import com.airbnb.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.authentication.PasswordEncoderParser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

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

    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    public UserDto userToUserDto(User user){
        return this.modelMapper.map(user, UserDto.class);
    }

    public User userDtoToUser(UserDto userDto){
        return this.modelMapper.map(userDto , User.class);
    }
}
