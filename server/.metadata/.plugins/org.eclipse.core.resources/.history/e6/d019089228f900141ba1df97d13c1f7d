package business;

import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class EditPerson implements UnitOfWork {

	PersonRepository personRepository;
	Person person;
	
	public EditPerson() {
		super();
	}

	@Override
	public boolean run() {
		Person personE = null;
		String change = person.getEmail();
		if(change!= null){
			personE = personRepository.updatePerson(person.getId(),
					"email", person.getEmail());
		}
		change = person.getHastly();
		if(change!= null){
			personE = personRepository.updatePerson(person.getId(),
					"hastly", person.getHastly());
		}
		change = person.getImage();
		if(change!= null){
			personE = personRepository.updatePerson(person.getId(),
					"image", person.getImage());
		}
		change = person.getName();
		if(change!= null){
			personE = personRepository.updatePerson(person.getId(),
					"name", person.getName());
		}
		change = person.getTelephone();
		if(change!= null){
			personE = personRepository.updatePerson(person.getId(),
					"telephone", person.getTelephone());
		}
		if(personE.getId() == person.getId()){
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
