package business;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class PostService implements UnitOfWork {

	private ServiRepository serviMongo;
	Servi servicioR;
	
	public void setServicioR(Servi servicioR) {
		this.servicioR = servicioR;
	}

	public PostService() {
		super();
	}

	@Override
	public boolean run() {
		Servi servicio = serviMongo.saveServi(servicioR);
		if(servicio==servicioR){
			return true;
		}
		return false;
	}

	@Override
	public void SetRepository(Repository repository) {
		this.serviMongo = (ServiRepository) serviMongo;
	}

}
