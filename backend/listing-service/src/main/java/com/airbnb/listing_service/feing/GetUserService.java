package com.airbnb.listing_service.feing;

import com.airbnb.listing_service.dto.UserDto;
import com.airbnb.listing_service.feing.FeignAuthInterceptor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(
        name = "user-service",
        url = "${services.user-service-url}",
        configuration = FeignAuthInterceptor.class
)
public interface GetUserService {

    @GetMapping("/auth/getAllUsers")
    List<UserDto> getAllUsers();

    @GetMapping("/auth/user/{email}")
    UserDto getCurrentUserDetials(@PathVariable("email") String email);

    @GetMapping("/auth/hostName/{id}")
    String getHostName(@PathVariable("id") Long id);


}
