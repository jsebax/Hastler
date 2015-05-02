package business;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import entity.Servi;
import repositories.Repository;
import repositories.ServiRepository;

public class PostComment implements UnitOfWork {

	ServiRepository serviRepository;
	Servi servi;
	
	public PostComment() {
		super();
	}

	@Override
	public boolean run() {
		List<String> comments = Collections.emptyList();
		comments.add(this.servi.getComment());
		Optional<Servi> service = serviRepository.findOneServi(this.servi.getId());
		comments.addAll(service.get().getComments());
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
		serviRepository = (ServiRepository) repository;
	}

	public void setComment(Servi sevicio) {
		servi = sevicio;
	}

}
