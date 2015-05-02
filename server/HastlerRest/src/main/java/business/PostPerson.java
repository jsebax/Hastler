package business;

import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class PostPerson implements UnitOfWork {

	PersonRepository personRepository;
	Person person;
	
	public PostPerson() {
		super();
	}

	@Override
	public boolean run() {
		Person personR = personRepository.savePerson(person);
		if(person.equals(personR)){
			return true;
		}else{
			return false;
		}		
	}

	@Override
	public void SetRepository(Repository repository) {
		personRepository = (PersonRepository) repository;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

}
