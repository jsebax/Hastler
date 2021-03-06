package business;

import java.util.ArrayList;
import java.util.List;

import DBServices.MongoServiRepository;
import repositories.Repository;
import repositories.ServiRepository;
import entity.Servi;

public class GetService implements UnitOfWork {

	private ServiRepository serviRepository;
	private Servi servi;
	private List<Servi>services;
	
	public GetService() {
		super();
	}

	@Override
	public boolean run() {
		services = new ArrayList<Servi>();
		services = serviRepository.findServi(servi.getServiceName());
		if(services.isEmpty()){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		serviRepository = new MongoServiRepository();
		serviRepository = (ServiRepository) repository;
	}

	public void setServi(Servi servicio) {
		servi = new Servi();
		servi = servicio;
	}

	public List<Servi> getServices() {
		return services;
	}

}
