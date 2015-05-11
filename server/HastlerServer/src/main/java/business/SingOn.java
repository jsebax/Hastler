package business;

import entity.User;
import repositories.Repository;
import repositories.UserRepository;

public class SingOn implements UnitOfWork {
	
	UserRepository userRepository;
	User user;
	
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
		userRepository =(UserRepository) repository;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
