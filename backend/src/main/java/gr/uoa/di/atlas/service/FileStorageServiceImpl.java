package gr.uoa.di.atlas.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Random;
import java.util.stream.Stream;


import gr.uoa.di.atlas.exception.StorageException;
import gr.uoa.di.atlas.exception.StorageFileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    @Value("${file.directory}")
    private String fileDirectory;
    private Path rootLocation;

    @Autowired
    public FileStorageServiceImpl() {

    }


    @Override
    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            Path fileName = appendRandomFilename(Paths.get(file.getOriginalFilename()));
            Path destinationFile = this.rootLocation.resolve(fileName).normalize().toAbsolutePath();

            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // Don't allow directory traversal for security
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }

            return fileName.toString();
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }


    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }
    @PostConstruct
    @Override
    public void init() {
        this.rootLocation = Paths.get(fileDirectory);
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    private Path appendRandomFilename(Path original) {
        int randomExtentionInt = new Random().nextInt(1 << 100);
        String randomExtentionString = "$1_"+ Integer.toString(randomExtentionInt) + "_$2";
        return original.resolveSibling(original.getFileName().toString()
                .replaceFirst("(.*?)(\\.[^.]+)?$", randomExtentionString));
    }

}