package business;

import java.util.List;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class GetAllService implements UnitOfWork {

	private ServiRepository serviMongo;
	private List<Servi> persons;
	
	public List<Servi> getPersons() {
		return persons;
	}
	
	public GetAllService() {
		super();
	}

	@Override
	public boolean run() {
		persons = serviMongo.findAllServi();
		if(persons!=null){
			return true;
		}
		return false;
	}

	@Override
	public void SetRepository(Repository serviMongo) {
		this.serviMongo = (ServiRepository) serviMongo;
	}

}
