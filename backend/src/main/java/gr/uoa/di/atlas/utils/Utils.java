package gr.uoa.di.atlas.utils;

import gr.uoa.di.atlas.dao.UserRepository;
import gr.uoa.di.atlas.model.User;
import org.springframework.security.core.Authentication;

import java.util.Collection;

public class Utils {

    public static User getAuthenticatedUser(Authentication authentication, UserRepository userRepository){
        String username = authentication.getName();
        Collection<User> users = userRepository.getUserByUsername(username);
        if(users.isEmpty()){
            throw new RuntimeException("User with username "+ username + " not found ");
        }
        User user = null;
        for( User userIter: users){
            user = userIter;
            break;
        }
        return user;
    }

    public static boolean containsIgnoreCase(String src, String what) {
        final int length = what.length();
        if (length == 0)
            return true; // Empty string is contained

        final char firstLo = Character.toLowerCase(what.charAt(0));
        final char firstUp = Character.toUpperCase(what.charAt(0));

        for (int i = src.length() - length; i >= 0; i--) {
            // Quick check before calling the more expensive regionMatches() method:
            final char ch = src.charAt(i);
            if (ch != firstLo && ch != firstUp)
                continue;

            if (src.regionMatches(true, i, what, 0, length))
                return true;
        }

        return false;
    }
}
