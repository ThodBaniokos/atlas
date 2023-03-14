package gr.uoa.di.atlas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class File {
    @Id
    @GeneratedValue
    private Long id;
    private String path;
    @JsonIgnore
    public File(String path) {
        this.path = path;
    }
}