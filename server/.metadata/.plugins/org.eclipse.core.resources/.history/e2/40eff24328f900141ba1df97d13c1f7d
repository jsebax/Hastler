package business;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class DelService implements UnitOfWork{

	ServiRepository serviRepository;
	Servi servi;
	
	public DelService() {
		super();
	}

	@Override
	public boolean run() {
		serviRepository.deleteServi(servi);
		return true;
	}

	@Override
	public void SetRepository(Repository repository) {
		serviRepository = (ServiRepository) repository;
	}

	public void setServi(Servi servicio) {
		servi = servicio;
	}

}
