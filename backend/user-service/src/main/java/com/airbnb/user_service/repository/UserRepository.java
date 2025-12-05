package com.airbnb.user_service.repository;

import com.airbnb.user_service.model.User;
import com.airbnb.user_service.payload.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
