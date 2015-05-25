package business;

import java.util.ArrayList;
import java.util.List;

import repositories.Repository;
import repositories.ServiRepository;
import DBServices.MongoServiRepository;
import entity.Comment;
import entity.Servi;

public class PostComment implements UnitOfWork {

	private ServiRepository serviRepository;
	private Servi servi;
	
	public PostComment() {
		super();
	}

	@Override
	public boolean run() {
		List<Comment> comments = new ArrayList<Comment>();
		comments.add(this.servi.getComment());
		Servi service = serviRepository.findOneServi(this.servi.getId());
		if(service.anyComments()){
			comments.addAll(service.getComments());
		}
		Servi serviR = serviRepository.updateServi(this.servi.getId(), 
				"comments", comments);
		if(serviR!=null){
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
