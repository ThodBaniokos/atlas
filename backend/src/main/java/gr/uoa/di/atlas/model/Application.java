package gr.uoa.di.atlas.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Application {
    private @Id
    @GeneratedValue Long id;
    private String reasoning;
    private String cancelReasoning;
    private Boolean submitted;
    private String  status;
    private Boolean seen;
    @OneToOne
    private Grades  grades;
    @ManyToOne
    private User user;
    @ManyToOne
    private Internship internship;
}
