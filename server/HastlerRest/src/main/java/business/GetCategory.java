package business;

import java.util.List;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class GetCategory implements UnitOfWork {

	ServiRepository serviRepository;
	String category;
	List<Servi> services;
	
	public GetCategory() {
		super();
	}

	@Override
	public boolean run() {
		services = serviRepository.findCategory(this.category);
		if(services !=null){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		serviRepository = (ServiRepository) repository;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<Servi> getServices() {
		return services;
	}

}