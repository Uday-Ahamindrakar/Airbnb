package com.airbnb.api_gateway.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSignKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract all claims from JWT
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload(); // new method in 0.12.x
    }

    // Extract username (subject)
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Check if token expired
    public boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    // Validate only expiry for Gateway
    public boolean validateToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception ex) {
            return false; // invalid, expired, corrupted
        }
    }
}
