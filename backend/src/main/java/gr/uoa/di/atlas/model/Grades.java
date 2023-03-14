package gr.uoa.di.atlas.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Grades {

    private @Id @GeneratedValue Long id;
    @OneToOne
    private File pdf;
    @ManyToOne
    private User user;

}
