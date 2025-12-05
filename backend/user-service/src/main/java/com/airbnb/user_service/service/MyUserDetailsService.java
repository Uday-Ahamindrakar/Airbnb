package com.airbnb.user_service.service;

import com.airbnb.user_service.model.User;
import com.airbnb.user_service.model.UserPrinciple;
import com.airbnb.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.sql.SQLOutput;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = this.userRepository.findByEmail(email);

        if(user == null){
            System.out.println("User does not exist");
            throw new UsernameNotFoundException("User does not exist in the database");
        }

        return new UserPrinciple(user);



    }
}
