package gr.uoa.di.atlas.dao;

import gr.uoa.di.atlas.model.Privilege;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public abstract class PrivilegeRepositoryImpl implements PrivilegeRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Privilege findByName(String name) {
        Privilege privilege = null;
        Query query = entityManager.createQuery("SELECT u FROM Privilege u WHERE u.name = ?1");
        query.setParameter(1, name);
        List<Privilege> privileges = query.getResultList();
        if (privileges != null && privileges.size() > 0)
            privilege = privileges.get(0);
        return privilege;
    }
}
