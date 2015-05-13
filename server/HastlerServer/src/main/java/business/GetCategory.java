package business;

import java.util.ArrayList;
import java.util.List;

import DBServices.MongoServiRepository;
import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class GetCategory implements UnitOfWork {

	private ServiRepository serviRepository;
	private String category;
	private List<Servi> services;
	
	public GetCategory() {
		super();
	}

	@Override
	public boolean run() {
		this.services = new ArrayList<Servi>();
		services = serviRepository.findCategory(this.category);
		if(services !=null){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		serviRepository = new MongoServiRepository();
		serviRepository = (ServiRepository) repository;
	}

	public void setCategory(String category) {
		this.category = new String();
		this.category = category;
	}

	public List<Servi> getServices() {
		return services;
	}

}
