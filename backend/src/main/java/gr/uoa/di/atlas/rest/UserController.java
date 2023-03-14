package gr.uoa.di.atlas.rest;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import gr.uoa.di.atlas.dao.RoleRepository;
import gr.uoa.di.atlas.dao.UserRepository;
import gr.uoa.di.atlas.model.User;
import gr.uoa.di.atlas.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.server.ResponseStatusException;

@Validated
@RestController
@Slf4j
class UserController {


    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    UserController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // Aggregate root
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users")
    List<User> all() {
        return userRepository.findAll();
    }

    // no preauthorise annotation, exception set for /users in WebSecurity.java
    @PostMapping("/users")
    User newUser(@RequestBody User newUser, String userType) {
        //log.info(newUser.getPassword());
        try {
            String username = newUser.getUsername();
            Collection<User> users = userRepository.getUserByUsername(username);
            if(!users.isEmpty()){
                throw new RuntimeException("Username Already Exists");
            }
            newUser.setActive(true); // new users are by default active
            newUser.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER"))); // new users are by default ROLE_USER
            return userRepository.save(newUser);

        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "NOT_ACCEPTABLE\n");
        }


    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/users")
    User updateUser(@RequestBody User newUser){
        try{
            User oldUser = userRepository.getReferenceById(newUser.getId());
            oldUser.setFirstname(newUser.getFirstname());
            oldUser.setLastname(newUser.getLastname());
            oldUser.setEmail(newUser.getEmail());
            oldUser.setDepartment(newUser.getDepartment());
            oldUser.setProviderType(newUser.getProviderType());
            oldUser.setProviderTob(newUser.getProviderTob());
            oldUser.setProviderName(newUser.getProviderName());
            oldUser.setProviderLandline(newUser.getProviderLandline());
            oldUser.setProviderAddress(newUser.getProviderAddress());
            oldUser.setProviderAfm(newUser.getProviderAfm());
            oldUser.setProviderDoy(newUser.getProviderDoy());
            oldUser.setProviderWebpage(newUser.getProviderWebpage());
            oldUser.setProviderId(newUser.getProviderId());
            return userRepository.save(oldUser);

        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users/{id}")
    User getsSigleUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/users/enable/{id}")
    User enableUser(@PathVariable Long id) {

        return userRepository.findById(id)
                .map(user -> {
                    user.setActive(true);
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("user id not found"));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/user/{id}")
    void deleteUser(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole(('ROLE_ADMIN'), ('ROLE_USER'))")
    @GetMapping("/user/info")
    User getMyUserInfo(Authentication authentication){
        try {
            String username = authentication.getName();
            Collection<User> users = userRepository.getUserByUsername(username);
            if(users.isEmpty()){
                throw new RuntimeException("User with username "+ username + " not found ");
            }
            User user = null;
            for( User userIter: users){
                user = userIter;
            }
            return user;

        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }

    }



}
