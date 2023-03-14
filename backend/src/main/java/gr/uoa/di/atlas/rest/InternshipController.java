package gr.uoa.di.atlas.rest;


import gr.uoa.di.atlas.dao.InternshipRepository;
import gr.uoa.di.atlas.dao.UserRepository;
import gr.uoa.di.atlas.model.Internship;
import gr.uoa.di.atlas.model.User;
import gr.uoa.di.atlas.utils.Utils;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
public class InternshipController {

    private UserRepository userRepository;

    private InternshipRepository internshipRepository;

    InternshipController(UserRepository userRepository, InternshipRepository internshipRepository){
        this.internshipRepository= internshipRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/internships")
    List<Internship> getAll(){
        return internshipRepository.findAll();
    }

    @GetMapping("/internships/single/{id}")
    Internship getSingle(@PathVariable Long id){
        return internshipRepository.findById(id).get();
    }

    @GetMapping("/internships/mine")
    Collection<Internship> getMyInternships(Authentication authentication){
        User user = Utils.getAuthenticatedUser(authentication, userRepository);
        return internshipRepository.getInternshipByAuthor(user);

    }


    @GetMapping("/internships/search/")
    Collection<Internship> search(String department, Long duration, String employmentType, String emloymentLocation, Date startDate, Date endDate){

        Collection<Internship> internships = internshipRepository.findAll();

        Collection<Internship> internshipsByDepartment = new ArrayList<>();

        if(department!=null){
            for( Internship internshipIter: internships) {
                if (Utils.containsIgnoreCase(internshipIter.getDepartment(), department)) {
                    internshipsByDepartment.add(internshipIter);
                }
            }
        }
        else{
            internshipsByDepartment = internships;
        }

        Collection<Internship> internshipsByDuration = new ArrayList<>();
        if(duration!=null){
            for(Internship internshipIter: internshipsByDepartment){
                if(duration==internshipIter.getDuration()){
                    internshipsByDuration.add(internshipIter);
                }
            }
        }else{
            internshipsByDuration = internshipsByDepartment;
        }

        Collection<Internship> internshipsByEmploymentType = new ArrayList<>();

        if(employmentType!=null){
            for(Internship internshipIter: internshipsByDuration){
                if(Utils.containsIgnoreCase(internshipIter.getEmploymentType(), employmentType)){
                    internshipsByEmploymentType.add(internshipIter);
                }
            }
        }else{
            internshipsByEmploymentType=internshipsByDuration;
        }

        Collection<Internship> internshipsByLocation = new ArrayList<>();

        if(emloymentLocation != null){

            for(Internship internshipIter: internshipsByEmploymentType){
                if(Utils.containsIgnoreCase(internshipIter.getEmploymentLocation(), emloymentLocation)){
                    internshipsByLocation.add(internshipIter);
                }
            }

        }else{
            internshipsByLocation=internshipsByEmploymentType;
        }

        Collection<Internship> internshipsByStartDate = new ArrayList<>();
        if(startDate!=null){
            for(Internship internshipIter: internshipsByLocation){
                if(internshipIter.getStartDate().after(startDate)){
                    internshipsByStartDate.add(internshipIter);
                }
            }
        }else{
            internshipsByStartDate= internshipsByLocation;
        }

        Collection<Internship> internshipsByEndDate  = new ArrayList<>();
        if(endDate!=null){
            for(Internship internshipIter: internshipsByStartDate){
                if(internshipIter.getEndDate().before(endDate)){
                    internshipsByEndDate.add(internshipIter);
                }

            }
        }else{
            internshipsByEndDate= internshipsByStartDate;
        }

        return internshipsByEndDate;

    }

    @PostMapping("/internship")
    Internship newInternship(@RequestBody Internship newInternship, Authentication authentication){
        try {
            User user = Utils.getAuthenticatedUser(authentication, userRepository);

            newInternship.setAuthor(user);

            newInternship.setEnabled(false);

            return internshipRepository.save(newInternship);

        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/internship/")
    Internship updateInternship( @RequestBody Internship newInternship){
        try{
            Internship oldInternship = internshipRepository.getReferenceById(newInternship.getId());
            if(oldInternship==null){
                throw new RuntimeException("Internship with id " + newInternship.getId() + " not found");
            }
            if(oldInternship.getEnabled()) {
                throw new RuntimeException("Internship Active, cannot Update");
            }
            oldInternship.copy(newInternship);
            return internshipRepository.save(oldInternship);

        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/internship/enable/{id}")
    Internship enableInternship(@PathVariable Long id){
        Internship internship = internshipRepository.getReferenceById(id);
        internship.setEnabled(true);
        return internshipRepository.save(internship);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/internship/assigned/{id}")
    Internship assignedInternship(@PathVariable Long id){
        Internship internship = internshipRepository.getReferenceById(id);
        internship.setAssigned(true);
        return internshipRepository.save(internship);
    }


}
