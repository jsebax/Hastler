package business;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class EditService implements UnitOfWork {

	ServiRepository serviRepository;
	Servi servi;
	
	public EditService() {
		super();
	}

	@Override
	public boolean run() {
		Servi serviE = null;
		String change = servi.getCategory();
		if(change != null){
			serviE = serviRepository.updateServi(servi.getId(),
					"category", servi.getCategory());
		}
		change = servi.getCity();
		if(change != null){
			serviE = serviRepository.updateServi(servi.getId(),
					"city", servi.getCity());
		}
		change = servi.getPic();
		if(change != null){
			serviE = serviRepository.updateServi(servi.getId(),
					"pic", servi.getPic());
		}
		change = servi.getServiceName();
		if(change != null){
			serviE = serviRepository.updateServi(servi.getId(),
					"serviceName", servi.getServiceName());
		}
		if(serviE.getId()==servi.getId()){
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
		servi =servicio;
	}

}