package gr.uoa.di.atlas.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import gr.uoa.di.atlas.security.Encryptor;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Collection;

@Data
@Entity
public class User {
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private @Id @GeneratedValue Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String department;
    private String providerType;
    private String providerTob;
    private String providerName;
    private String providerLandline;
    private String providerAddress;
    private String providerAfm;
    private String providerDoy;
    private String providerWebpage;
    @NotEmpty
    private String username;
    private Boolean active;
    @NotEmpty
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String providerId;
    private String userType;
    @ManyToMany
    @JsonIgnoreProperties(value = {"users", "privileges"}, allowSetters =false)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
    public User() {}
    public User(String firstname, String lastname, String username) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;

    }
    public  User(String username, String password, Collection<Role> roles, Boolean active){
        this.username = username;
        this.password = Encryptor.bCryptPasswordEncoder().encode(password);
        this.setRoles(roles);
        this.setActive(active);
    }
    public void setPassword(String password) {
        this.password = Encryptor.bCryptPasswordEncoder().encode(password);
    }
}