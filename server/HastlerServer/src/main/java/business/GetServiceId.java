package business;

import repositories.Repository;
import repositories.ServiRepository;
import DBServices.MongoServiRepository;
import entity.Servi;

public class GetServiceId implements UnitOfWork {
	private ServiRepository serviRepository;
	private Servi servi;
	private Servi services;
	
	public GetServiceId() {
		super();
	}

	@Override
	public boolean run() {
		services = serviRepository.findServiId(servi.getId());
		if(services==null){
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

	public Servi getServices() {
		return services;
	}

}
