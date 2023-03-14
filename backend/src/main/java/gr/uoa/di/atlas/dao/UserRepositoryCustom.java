package gr.uoa.di.atlas.dao;


import gr.uoa.di.atlas.model.User;

public interface UserRepositoryCustom {
    User findByUsername(String username);
}
