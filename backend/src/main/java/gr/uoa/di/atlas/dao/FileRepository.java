package gr.uoa.di.atlas.dao;

import gr.uoa.di.atlas.model.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

}