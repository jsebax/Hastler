package repository;

import org.springframework.data.repository.Repository;

import entity.Person;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends Repository<Person, String> {
	void delete(Person deleted);
	 
    List<Person> findAll();
 
    Optional<Person> findOne(String id);
 
    Person save(Person saved);
}
