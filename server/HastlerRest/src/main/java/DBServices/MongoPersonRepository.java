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
import entity.Person;
import repositories.PersonRepository;

public class MongoPersonRepository implements PersonRepository {
	
	public MongoPersonRepository() {
		super();
	}
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
	MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

	@Override
	public void deletePerson(Person deleted) {
		Query searchUserQuery = new Query(Criteria.where("id").is(deleted.getId()));
		mongoOperation.remove(searchUserQuery, Person.class);
	}
	
	@Override
	public List<Person> findAllPerson() {
		List<Person> listPerson = mongoOperation.findAll(Person.class);
		return listPerson;
	}
	
	@Override
	public Optional<Person> findOnePerson(String id) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		Person saved = mongoOperation.findOne(searchUserQuery, Person.class);
		Optional<Person> optionalSaved = Optional.of(saved);
		return optionalSaved;
	}
	
	@Override
	public Person savePerson(Person saved) {
		mongoOperation.save(saved);
		return saved;
	}
	
	@Override
	public Person updatePerson(String id, String toUp, Object update) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		mongoOperation.updateFirst(searchUserQuery, Update.update(toUp, update),
				Person.class);
		Person saved = mongoOperation.findOne(searchUserQuery, Person.class);
		return saved;
	}
	
	@Override
	public List<Person> findPerson(String personData) {
		Query searchPersonQuery = new Query(Criteria.where("name").regex(personData).orOperator(
				Criteria.where("hastly").regex(personData)).orOperator(
						Criteria.where("email").regex(personData)));
		List<Person> finded = mongoOperation.find(searchPersonQuery, Person.class);
		return finded;
	}

	@Override
	public Optional<Person> findPersonEmail(String email) {
		Query searchUserQuery = new Query(Criteria.where("email").is(email));
		Person saved = mongoOperation.findOne(searchUserQuery, Person.class);
		Optional<Person> optionalSaved = Optional.of(saved);
		return optionalSaved;
	}

	@Override
	public Optional<Person> findPersonHastly(String hastly) {
		Query searchUserQuery = new Query(Criteria.where("hastly").is(hastly));
		Person saved = mongoOperation.findOne(searchUserQuery, Person.class);
		Optional<Person> optionalSaved = Optional.of(saved);
		return optionalSaved;
	}
}
