package business;

import java.util.UUID;

import DBServices.MongoPersonRepository;
import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class PostPerson implements UnitOfWork {

	private PersonRepository personRepository;
	private Person person;
	
	public PostPerson() {
		super();
	}

	@Override
	public boolean run() {
		person.setId(UUID.randomUUID().toString());
		Person personR = personRepository.savePerson(person);
		if(person.equals(personR)){
			return true;
		}else{
			return false;
		}		
	}

	@Override
	public void SetRepository(Repository repository) {
		personRepository = new MongoPersonRepository();
		personRepository = (PersonRepository) repository;
	}

	public void setPerson(Person person) {
		this.person = new Person();
		this.person = person;
	}

}
