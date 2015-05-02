package repositories;

import java.util.List;
import java.util.Optional;

import entity.User;

public interface UserRepository extends Repository{
	void deleteUser(User deleted);
	 
    List<User> findAllUser();
 
    Optional<User> findOneUser(String id);
 
    User saveUser(User saved);
    
    User updateUser(String id, String toUp, Object update);
    
	boolean findOneUser(User us);
}
