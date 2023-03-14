package gr.uoa.di.atlas.dao;


import gr.uoa.di.atlas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface UserRepository extends JpaRepository<User, Long>{
        User getUserById(Long id);
        Collection<User> getUserByUsername(String userName);

        public User findByUsername( String userName);

}
