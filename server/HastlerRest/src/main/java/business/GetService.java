package business;

import java.util.List;

import repositories.Repository;
import repositories.ServiRepository;
import entity.Servi;

public class GetService implements UnitOfWork {

	ServiRepository serviRepository;
	Servi servi;
	List<Servi>services;
	
	public GetService() {
		super();
	}

	@Override
	public boolean run() {
		services = serviRepository.findServi(servi.getServiceName());
		if(services.isEmpty()){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		serviRepository = (ServiRepository) repository;
	}

	public void setServi(Servi servicio) {
		servi = servicio;
	}

	public List<Servi> getServices() {
		return services;
	}

}
