package business;

import DBServices.MongoPersonRepository;
import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class EditPerson implements UnitOfWork {

	private PersonRepository personRepository;
	private Person person;
	
	public EditPerson() {
		super();
	}

	@Override
	public boolean run() {
		Person personE = null;
		if(person!=null){
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
			change = person.getLastName();
			if(change!= null){
				System.out.println("se está cambiando el lastname");
				personE = personRepository.updatePerson(person.getId(),
						"lastName", person.getLastName());
			}
			if(personE == null){
				return false;
			}
			if(personE.getId() !=null){
				return true;
			}else{
				return false;
			}
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
