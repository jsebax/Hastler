package business;

import java.util.Optional;

import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class GetPersonEmail implements UnitOfWork {

	PersonRepository personRepository;
	Optional<Person> persons;
	Person person;
	
	public GetPersonEmail() {
		super();
	}

	@Override
	public boolean run() {
		persons = personRepository.findPersonEmail(person.getEmail());
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
