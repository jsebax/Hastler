package business;

import java.util.ArrayList;
import java.util.List;

import DBServices.MongoPersonRepository;
import repositories.PersonRepository;
import repositories.Repository;
import entity.Person;

public class GetPerson implements UnitOfWork {

	private PersonRepository personRepository;
	private List<Person> persons;
	private Person person;
	
	public GetPerson() {
		super();
	}

	@Override
	public boolean run() {
		persons = new ArrayList<Person>();
		persons = personRepository.findPerson(person.getName());
		if (persons.isEmpty()){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		personRepository = new MongoPersonRepository();
		personRepository = (PersonRepository) repository;
	}

	public List<Person> getPersons() {
		return persons;
	}

	public void setPerson(Person person) {
		this.person = new Person();
		this.person = person;
	}

}
