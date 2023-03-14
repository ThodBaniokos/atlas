package gr.uoa.di.atlas.dao;


import gr.uoa.di.atlas.model.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long>{

    Privilege findByName(String name);

}
