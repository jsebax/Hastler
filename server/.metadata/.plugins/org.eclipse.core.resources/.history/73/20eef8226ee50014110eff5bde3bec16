package com.mkyong.service;

import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.mkyong.config.SpringMongoConfig;

import entity.Person;
import entity.Servi;
import entity.User;

public class MongoDBService implements DBService {

	public MongoDBService() {
		super();
	}
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
	MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");
	
	@Override
	public void deleteUser(User deleted) {
		Query searchUserQuery = new Query(Criteria.where("id").is(deleted.getId()));
		mongoOperation.remove(searchUserQuery, User.class);		
	}
	@Override
	public List<User> findAllUser() {
		List<User> listUser = mongoOperation.findAll(User.class);
		return listUser;
	}
	@Override
	public Optional<User> findOneUser(String id) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		User saved = mongoOperation.findOne(searchUserQuery, User.class);
		Optional<User> optionalSaved = Optional.of(saved);
		return optionalSaved;
	}
	public boolean findOneUser(User us) {
		Query searchUserQuery = new Query(Criteria.where("username")
				.is(us.getUsername()).andOperator(Criteria.where("password").is(us.getPassword())));
		User saved = mongoOperation.findOne(searchUserQuery, User.class);
		boolean respuesta=false;
		if(saved!=null)respuesta=true;
		return respuesta;
	}
	@Override
	public User saveUser(User saved) {
		mongoOperation.save(saved);
		return saved;
	}
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
	public User updateUser(String id, String toUp, Object update) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		mongoOperation.updateFirst(searchUserQuery, Update.update(toUp, update),
				User.class);
		User saved = mongoOperation.findOne(searchUserQuery, User.class);
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
	public Servi updateServi(String id, String toUp, Object update) {
		Query searchUserQuery = new Query(Criteria.where("id").is(id));
		mongoOperation.updateFirst(searchUserQuery, Update.update(toUp, update),
				Servi.class);
		Servi saved = mongoOperation.findOne(searchUserQuery, Servi.class);
		return saved;
	}

}
