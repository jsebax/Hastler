package business;

import DBServices.MongoUserRepository;
import entity.User;
import repositories.Repository;
import repositories.UserRepository;

public class EmailCheck implements UnitOfWork {
	private UserRepository userRepository;
	private User user;
	
	public EmailCheck() {
		super();
	}

	@Override
	public boolean run() {
		boolean result = false;
		result = userRepository.findOneUser(user.getEmail(), 1);
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
