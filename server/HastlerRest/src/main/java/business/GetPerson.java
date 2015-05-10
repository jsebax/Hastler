package business;

import java.util.List;

import repositories.PersonRepository;
import repositories.Repository;
import entity.Person;

public class GetPerson implements UnitOfWork {

	PersonRepository personRepository;
	List<Person> persons;
	Person person;
	
	public GetPerson() {
		super();
	}

	@Override
	public boolean run() {
		persons = personRepository.findPerson(person.getName());
		if (persons.isEmpty()){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		personRepository = (PersonRepository) repository;
	}

	public List<Person> getPersons() {
		return persons;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

}
