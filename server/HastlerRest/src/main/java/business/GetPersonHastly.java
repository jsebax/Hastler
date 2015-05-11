package business;

import java.util.Optional;

import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class GetPersonHastly implements UnitOfWork {
	PersonRepository personRepository;
	Optional<Person> persons;
	Person person;
	
	public GetPersonHastly() {
		super();
	}

	@Override
	public boolean run() {
		persons = personRepository.findPersonHastly(person.getHastly());
		if (persons.isPresent()){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		personRepository = (PersonRepository) repository;
	}

	public Person getPersons() {
		return persons.get();
	}

	public void setPerson(Person person) {
		this.person = person;
	}

}
