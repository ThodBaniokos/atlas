package gr.uoa.di.atlas.rest;

import gr.uoa.di.atlas.dao.GradesRepository;
import gr.uoa.di.atlas.dao.FileRepository;
import gr.uoa.di.atlas.dao.UserRepository;
import gr.uoa.di.atlas.model.File;
import gr.uoa.di.atlas.model.Grades;
import gr.uoa.di.atlas.model.User;
import gr.uoa.di.atlas.service.FileStorageService;
import gr.uoa.di.atlas.utils.Utils;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Collection;

@RestController
class FileController {

    private final FileRepository fileRepository;

    private final GradesRepository gradesRepository;
    private final FileStorageService fileStorageService;

    private final UserRepository userRepository;

    FileController(FileRepository fileRepository, FileStorageService fileStorageService, GradesRepository gradesRepository, UserRepository userRepository) {

        this.fileRepository = fileRepository;
        this.fileStorageService = fileStorageService;
        this.gradesRepository = gradesRepository;
        this.userRepository = userRepository;

    }

    @PostMapping("/files/upload")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Grades singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes, Authentication authentication) {



        String fileName = fileStorageService.store(file);
        redirectAttributes.addFlashAttribute("message","You successfully uploaded " + file.getOriginalFilename() + "");

        File newFile = new File();
        newFile.setPath(fileName);
        fileRepository.save(newFile);

        Grades grades = new Grades();

        grades.setPdf(newFile);

        User user = Utils.getAuthenticatedUser(authentication, userRepository);

        grades.setUser(user);

        return gradesRepository.save(grades);
    }

    @GetMapping(value = "/file/{filename:.+}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {

        Resource file = fileStorageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=\"" + file.getFilename() + "\"").body(file);
    }


    @GetMapping("/grades")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Collection<Grades> getGradesByUser(Authentication authentication){
        User user = Utils.getAuthenticatedUser(authentication, userRepository);

        return gradesRepository.getGradesByUser(user);

    }

    @DeleteMapping("/files/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    void deleteImage(@PathVariable Long id) {
        fileRepository.deleteById(id);
    }
}
