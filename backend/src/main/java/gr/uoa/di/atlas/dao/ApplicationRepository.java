package gr.uoa.di.atlas.dao;

import gr.uoa.di.atlas.model.Application;
import gr.uoa.di.atlas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> getApplicationByInternshipId(Long id);

    List<Application> getApplicationsByUser(User user);
}
