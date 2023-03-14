package gr.uoa.di.atlas.dao;

import gr.uoa.di.atlas.model.Internship;
import gr.uoa.di.atlas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

    Collection<Internship> getInternshipByAuthor(User author);
    Internship getInternshipById(Long id);

}
