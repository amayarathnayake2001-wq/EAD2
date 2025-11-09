package com.example.appointment_booking_system.Controller;

import com.example.appointment_booking_system.dto.AuthRequest;
import com.example.appointment_booking_system.dto.AuthResponse;
import com.example.appointment_booking_system.model.Role;
import com.example.appointment_booking_system.model.User;
import com.example.appointment_booking_system.Repository.UserRepo;
import com.example.appointment_booking_system.config.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class AuthController {

    @Autowired private UserRepo userRepo;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody AuthRequest request) {
        if (request.getUsername() == null || request.getUsername().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("❌ Username and password are required.");
        }

        if (userRepo.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("❌ Username already exists!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepo.save(user);
        return ResponseEntity.ok("✅ User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()
                    )
            );

            // Load user (to get role)
            User user = userRepo.findByUsername(request.getUsername())
                    .orElseThrow();

            String token = jwtService.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, user.getRole().name()));

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("❌ Invalid username or password.");
        }
    }
}
