package repositories;

import java.util.List;

import entity.User;

public interface UserRepository extends Repository{
	void deleteUser(User deleted);
	 
    List<User> findAllUser();
 
    User findOneUser(String id);
 
    User saveUser(User saved);
    
    User updateUser(String id, String toUp, Object update);
    
	boolean findOneUser(User us);

	boolean findOneUser(String email, String pass);
	
	boolean findOneUser(String email, int pass);
}
