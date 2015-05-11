package business;

import java.util.UUID;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class PostService implements UnitOfWork {

	private ServiRepository serviMongo;
	Servi servicio;
	
	public void setServicioR(Servi servicioR) {
		this.servicio = servicioR;
	}

	public PostService() {
		super();
	}

	@Override
	public boolean run() {
		servicio.setId(UUID.randomUUID().toString());
		Servi servicioR = serviMongo.saveServi(servicio);
		
		if(servicioR.equals(servicio)){
			return true;
		}
		return false;
	}

	@Override
	public void SetRepository(Repository repository) {
		this.serviMongo = (ServiRepository) serviMongo;
	}

}
