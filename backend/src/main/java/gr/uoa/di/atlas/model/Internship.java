package gr.uoa.di.atlas.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
@Data
@Entity
public class Internship {

    private @Id
    @GeneratedValue Long id;

    private String title;
    private String department;
    private int duration;
    private String employmentType;
    private String employmentLocation;
    private Date startDate;
    private Date endDate;
    private float remunerationAmt;
    private Boolean enabled;

    private String description;
    @OneToOne
    private User author;

    private Boolean assigned;

    public void copy(Internship internship){
        this.title = internship.getTitle();
        this.department = internship.getDepartment();
        this.duration = internship.getDuration();
        this.employmentType = internship.getEmploymentType();
        this.employmentLocation = internship.getEmploymentLocation();
        this.startDate = internship.getStartDate();
        this.endDate = internship.getEndDate();
        this.remunerationAmt = internship.getRemunerationAmt();
        this.description= internship.getDescription();
    }



}
