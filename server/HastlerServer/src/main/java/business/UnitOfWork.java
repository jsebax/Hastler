package business;

import repositories.Repository;

public interface UnitOfWork {
	
	boolean run();
	
	void SetRepository(Repository repository);
	
}
