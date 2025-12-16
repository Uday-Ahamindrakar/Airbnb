package com.airbnb.api_gateway.filter;

import com.airbnb.api_gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
        System.out.println("🔵 Incoming Path = " + path);

        // Allow /auth/** without JWT
        if (path.startsWith("/auth")) {
            System.out.println("🟢 Allowed: Auth path");
            return chain.filter(exchange);
        }

        if(path.startsWith("/listing/all-properties")){
            return chain.filter(exchange);
        }

        // Extract Authorization header
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("❌ Missing Authorization header");
            return this.onError(exchange, HttpStatus.UNAUTHORIZED, "Missing Authorization Header");
        }

        String token = authHeader.substring(7);

        // Validate JWT
        if (!jwtUtil.validateToken(token)) {
            System.out.println("❌ Invalid JWT token");
            return this.onError(exchange, HttpStatus.UNAUTHORIZED, "Invalid Token");
        }

        // Extract claims
        Claims claims = jwtUtil.extractAllClaims(token);
        String userId = claims.getSubject();
        String role = claims.get("role", String.class);

        System.out.println("🔥 GATEWAY FILTER EXECUTED");
        System.out.println("🔥 USER = " + userId);
        System.out.println("🔥 ROLE = " + role);
        System.out.println("?? All claim "+ claims);

        // Handle missing role (JWT does not contain role)
        if (role == null) {
            System.out.println("❌ JWT has NO role field");
            return this.onError(exchange, HttpStatus.UNAUTHORIZED, "Role Missing in JWT");
        }

        // Forward roles & user ID to microservices
        var modifiedRequest = exchange.getRequest()
                .mutate()
                .header("X-User-Id", userId)
                .header("X-User-Role", role)
                .build();

        ServerWebExchange modifiedExchange = exchange.mutate()
                .request(modifiedRequest)
                .build();

        System.out.println("🟢 Forwarding with Headers → X-User-Id=" + userId + ", X-User-Role=" + role);

        return chain.filter(modifiedExchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus status, String message) {
        System.out.println("❌ ERROR: " + message + " | STATUS = " + status);
        exchange.getResponse().setStatusCode(status);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1; // Must run BEFORE routing filters
    }
}


//
//package com.airbnb.api_gateway.filter;
//
//import com.airbnb.api_gateway.util.JwtUtil;
//import io.jsonwebtoken.Claims;
//import lombok.RequiredArgsConstructor;
//import org.springframework.cloud.gateway.filter.GatewayFilterChain;
//import org.springframework.cloud.gateway.filter.GlobalFilter;
//import org.springframework.core.Ordered;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter implements GlobalFilter, Ordered {
//
//    private final JwtUtil jwtUtil;
//
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//
//        String path = exchange.getRequest().getURI().getPath();
//
//        if (path.startsWith("/auth") || path.startsWith("/listing/all-properties")) {
//            return chain.filter(exchange);
//        }
//
//        String token = extractJwtFromCookie(exchange);
//
//        if (token == null || !jwtUtil.validateToken(token)) {
//            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//            return exchange.getResponse().setComplete();
//        }
//
//        Claims claims = jwtUtil.extractAllClaims(token);
//        String userId = claims.getSubject();
//        String role = claims.get("role", String.class);
//
//        if (role == null) {
//            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//            return exchange.getResponse().setComplete();
//        }
//
//        ServerHttpRequest modifiedRequest = exchange.getRequest()
//                .mutate()
//                .header("X-User-Id", userId)
//                .header("X-User-Role", role)
//                .build();
//
//        ServerWebExchange modifiedExchange = exchange.mutate()
//                .request(modifiedRequest)
//                .build();
//
//        return chain.filter(modifiedExchange);
//    }
//
//    private String extractJwtFromCookie(ServerWebExchange exchange) {
//
//        if (exchange.getRequest().getCookies() == null) {
//            return null;
//        }
//
//        return exchange.getRequest()
//                .getCookies()
//                .getFirst("access_token") != null
//                ? exchange.getRequest().getCookies().getFirst("access_token").getValue()
//                : null;
//    }
//
//    @Override
//    public int getOrder() {
//        return -1;
//    }
//}
//
//
