package gr.uoa.di.atlas.dao;

import gr.uoa.di.atlas.model.Role;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public abstract class RoleRepositoryImpl implements RoleRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Role findByName(String name) {
        Role role = null;
        Query query = entityManager.createQuery("SELECT u FROM Privilege u WHERE u.name = ?1");
        query.setParameter(1, name);
        List<Role> roles = query.getResultList();
        if (roles != null && roles.size() > 0)
            role = roles.get(0);
        return role;
    }
}
