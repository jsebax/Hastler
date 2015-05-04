package business;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class GetService implements UnitOfWork {

	ServiRepository serviRepository;
	Servi servi;
	List<Servi>services;
	
	public GetService() {
		super();
	}

	@Override
	public boolean run() {
		Optional<Servi> serviR = serviRepository.findOneServi(servi.getId());
		services = Collections.singletonList(serviR.get());
		if(serviR.isPresent()){
			return true;
		}else{
			return false;
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