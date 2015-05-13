package business;

import DBServices.MongoUserRepository;
import entity.User;
import repositories.Repository;
import repositories.UserRepository;

public class SingOn implements UnitOfWork {
	
	private UserRepository userRepository;
	private User user;
	
	public SingOn(){
		super();
	}

	@Override
	public boolean run() {
		User userR = userRepository.saveUser(user);
		if(userR.equals(user)){
			return true;
		}else{
			return false;
		}
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
