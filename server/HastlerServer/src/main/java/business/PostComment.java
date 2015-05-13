package business;

import java.util.Collections;
import java.util.List;

import DBServices.MongoServiRepository;
import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class PostComment implements UnitOfWork {

	private ServiRepository serviRepository;
	private Servi servi;
	
	public PostComment() {
		super();
	}

	@Override
	public boolean run() {
		List<String> comments = Collections.emptyList();
		comments.add(this.servi.getComment());
		Servi service = serviRepository.findOneServi(this.servi.getId());
		comments.addAll(service.getComments());
		Servi serviR = serviRepository.updateServi(this.servi.getId(), 
				"comment", comments);
		if(serviR.getId() == this.servi.getId()){
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

	public void setComment(Servi sevicio) {
		servi = new Servi();
		servi = sevicio;
	}

}
