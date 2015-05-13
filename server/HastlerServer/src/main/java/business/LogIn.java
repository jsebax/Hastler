package business;

import DBServices.MongoUserRepository;
import entity.User;
import repositories.Repository;
import repositories.UserRepository;

public class LogIn implements UnitOfWork {

	private UserRepository userRepository;
	private User user;
	
	public LogIn() {
		super();
	}

	@Override
	public boolean run() {
		boolean result = false;
		if(user.getUsername()!=null){
			result = userRepository.findOneUser(user);
		}else{ 
			result = userRepository.findOneUser(user.getEmail(), user.getPassword());
		}
		return result;
	}

	@Override
	public void SetRepository(Repository repository) {
		userRepository = new MongoUserRepository();
		userRepository = (UserRepository) repository;
	}

	public void setUser(User user) {
		this.user = new User();
		this.user = user;
	}

}
