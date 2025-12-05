package com.airbnb.user_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Role")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String roleName;
}
