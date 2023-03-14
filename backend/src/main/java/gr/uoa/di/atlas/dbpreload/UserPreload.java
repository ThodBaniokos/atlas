package gr.uoa.di.atlas.dbpreload;

import gr.uoa.di.atlas.dao.RoleRepository;
import gr.uoa.di.atlas.dao.UserRepository;
import gr.uoa.di.atlas.model.User;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;

@Slf4j
class UserPreload {


    @Bean
    void initDatabase(UserRepository userRepository, RoleRepository roleRepository) throws IOException {

//       Collection<User> users = userRepository.getUserByUsername("admin4");
//       User adminUser = null;
//       for(User userIter: users){
//           adminUser = userIter;
//           break;
//       }
//       if(adminUser==null){
//           userRepository.save(new User("admin4", "pwd1", Arrays.asList(roleRepository.findByName("ROLE_ADMIN")), true));
//           userRepository.save(new User("user99", "pwd1", Arrays.asList(roleRepository.findByName("ROLE_USER")), true));
//           userRepository.save(new User("user100", "pwd1", Arrays.asList(roleRepository.findByName("ROLE_USER")), true));
//       }
//
//       log.info("Preload RUN");

        return ;
    }
}
