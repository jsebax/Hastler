package repositories;

import java.util.List;

import entity.Person;

public interface PersonRepository extends Repository{
	void deletePerson(Person deleted);
	 
    List<Person> findAllPerson();
 
    Person findOnePerson(String id);
 
    Person savePerson(Person saved);
    
    Person updatePerson(String id, String toUp, Object update);

	List<Person> findPerson(String personData);

	Person findPersonEmail(String email);
	
	Person findPersonHastly(String email);
}
