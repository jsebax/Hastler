package DBServices;

import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import DBconfig.SpringMongoConfig;
import entity.Servi;
import repositories.ServiRepository;

public class MongoServiRepository implements ServiRepository {

	public MongoServiRepository() {
		super();
	}
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
	MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");
	
	@Override
	public void deleteServi(Servi deleted) {
		Query searchUserQuery = new Query(Criteria.where("id").is(deleted.getId()));
		mongoOperation.remove(searchUserQuery, Servi.class);
	}
	
	@Override
	public List<Servi> findAllServi() {
		List<Servi> listServi = mongoOperation.findAll(Servi.class);
		return listServi;
	}
	
	@Override
	public Optional<Servi> findOneServi(String id) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		Servi saved = mongoOperation.findOne(searchUserQuery, Servi.class);
		Optional<Servi> optionalSaved = Optional.of(saved);
		return optionalSaved;
	}
	
	@Override
	public Servi saveServi(Servi saved) {
		mongoOperation.save(saved);
		return saved;
	}
	
	@Override
	public Servi updateServi(String id, String toUp, Object update) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		mongoOperation.updateFirst(searchUserQuery, Update.update(toUp, update),
				Servi.class);
		Servi saved = mongoOperation.findOne(searchUserQuery, Servi.class);
		return saved;
	}


}
