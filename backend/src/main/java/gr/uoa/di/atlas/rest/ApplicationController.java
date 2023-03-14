package gr.uoa.di.atlas.rest;


import gr.uoa.di.atlas.dao.ApplicationRepository;
import gr.uoa.di.atlas.dao.GradesRepository;
import gr.uoa.di.atlas.dao.InternshipRepository;
import gr.uoa.di.atlas.dao.UserRepository;
import gr.uoa.di.atlas.model.Application;
import gr.uoa.di.atlas.model.Grades;
import gr.uoa.di.atlas.model.Internship;
import gr.uoa.di.atlas.model.User;
import gr.uoa.di.atlas.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@Slf4j
public class ApplicationController {


    private final UserRepository userRepository;
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;

    private final GradesRepository gradesRepository;


    public ApplicationController(UserRepository userRepository, InternshipRepository internshipRepository, ApplicationRepository applicationRepository, GradesRepository gradesRepository) {
        this.userRepository = userRepository;
        this.internshipRepository = internshipRepository;
        this.applicationRepository = applicationRepository;
        this.gradesRepository = gradesRepository;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/applications/internship/{internsipID}")
    List<Application> getApplicationByInternship(@PathVariable Long internsipID) {

        return applicationRepository.getApplicationByInternshipId(internsipID);

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/applications/user/{userId}")
    List<Application> getApplicationByUser(@PathVariable Long userId) {
        User user = userRepository.getUserById(userId);
        return applicationRepository.getApplicationsByUser(user);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/applications")
    Application newApplication(@RequestBody Application newApplication, Authentication authentication) {

        Internship internship = internshipRepository.getInternshipById(newApplication.getInternship().getId());

        newApplication.setInternship(internship);

        Grades grades = gradesRepository.getGradesById(newApplication.getGrades().getId());

        User user = Utils.getAuthenticatedUser(authentication, userRepository);

        newApplication.setUser(user);

        newApplication.setGrades(grades);

        return applicationRepository.save(newApplication);

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/applications")
    Application updateApplication(@RequestBody Application newApplication, Authentication authentication) {
        try {
            Application oldApplication = applicationRepository.getById(newApplication.getId());

            oldApplication.setSubmitted(newApplication.getSubmitted());
            oldApplication.setStatus(newApplication.getStatus());
            oldApplication.setCancelReasoning(newApplication.getCancelReasoning());
            oldApplication.setGrades(newApplication.getGrades());
            oldApplication.setReasoning(newApplication.getReasoning());
            return applicationRepository.save(oldApplication);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/applications/seen/{id}")
    Application enableInternship(@PathVariable Long id) {
        Application application = applicationRepository.getReferenceById(id);
        application.setSeen(true);
        return applicationRepository.save(application);
    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/applications/{id}")
    void deleteApplication(@PathVariable Long id) {
        applicationRepository.delete(applicationRepository.getById(id));
    }

}




