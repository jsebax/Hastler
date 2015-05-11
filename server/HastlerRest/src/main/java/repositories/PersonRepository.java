package repositories;

import java.util.List;
import java.util.Optional;

import entity.Person;

public interface PersonRepository extends Repository{
	void deletePerson(Person deleted);
	 
    List<Person> findAllPerson();
 
    Optional<Person> findOnePerson(String id);
 
    Person savePerson(Person saved);
    
    Person updatePerson(String id, String toUp, Object update);

	List<Person> findPerson(String personData);

	Optional<Person> findPersonEmail(String email);
	
	Optional<Person> findPersonHastly(String email);
}
