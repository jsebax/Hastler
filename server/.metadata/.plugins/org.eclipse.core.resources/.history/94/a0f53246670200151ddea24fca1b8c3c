package DBServices;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import repositories.MatchRepository;
import DBconfig.SpringMongoConfig;
import entity.Match;

public class MongoMatchRepository implements MatchRepository {

	public MongoMatchRepository() {
		super();
	}
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
	MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");
	
	@Override
	public void deleteMatch(Match deleted) {
		Query searchMatchQuery = new Query(Criteria.where("id").is(deleted.getId()));
		mongoOperation.remove(searchMatchQuery, Match.class);
	}

	@Override
	public List<Match> findAllMatch() {
		List<Match> listMatch = mongoOperation.findAll(Match.class);
		return listMatch;
	}

	@Override
	public Match findOneMatch(String id) {
		Query searchMatchQuery = new Query(Criteria.where("id").is(id));
		Match finded = mongoOperation.findOne(searchMatchQuery, Match.class);
		return finded;
	}

	@Override
	public Match saveMatch(Match saved) {
		mongoOperation.save(saved);
		return saved;
	}

	@Override
	public Match updateMatch(String id, String toUp, Object update) {
		Query searchMatchQuery = new Query(Criteria.where("id").is(id));
		mongoOperation.updateFirst(searchMatchQuery, Update.update(toUp, update),
				Match.class);
		Match saved = mongoOperation.findOne(searchMatchQuery, Match.class);
		return saved;
	}

	@Override
	public List<Match> findMatchServi(String serviId) {
		Query searchMatchQuery = new Query(Criteria.where("serviId").is(serviId));
		List<Match> finded = mongoOperation.find(searchMatchQuery, Match.class);
		return finded;
	}

	@Override
	public List<Match> findMatchHastly(String data) {
		Query searchMatchQuery = new Query(Criteria.where("hastly").is(data));
		List<Match> finded = mongoOperation.find(searchMatchQuery, Match.class);
		return finded;
	}

}
