package business;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class GetPerson implements UnitOfWork {

	PersonRepository personRepository;
	List<Person> persons;
	Person person;
	
	public GetPerson() {
		super();
	}

	@Override
	public boolean run() {
		Optional<Person>  option = personRepository.findOnePerson(person.getId());
		if (option.isPresent()){
			persons = Collections.singletonList(option.get());
			return true;
		}else{
			persons = Collections.emptyList();
			return false;
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
