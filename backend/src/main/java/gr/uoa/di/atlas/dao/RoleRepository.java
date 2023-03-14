package gr.uoa.di.atlas.dao;


import gr.uoa.di.atlas.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String role);
}
