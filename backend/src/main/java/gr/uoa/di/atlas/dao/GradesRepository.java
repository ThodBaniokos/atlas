package gr.uoa.di.atlas.dao;

import gr.uoa.di.atlas.model.Grades;
import gr.uoa.di.atlas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface GradesRepository extends JpaRepository<Grades, Long> {

  Collection<Grades> getGradesByUser(User User);
 Grades getGradesById(Long id);
}
