package business;



import DBServices.MongoPersonRepository;
import entity.Person;
import repositories.PersonRepository;
import repositories.Repository;

public class GetPersonEmail implements UnitOfWork {

	private PersonRepository personRepository;
	private Person persons;
	private Person person;
	
	public GetPersonEmail() {
		super();
	}

	@Override
	public boolean run() {
		persons = new Person();
		persons = personRepository.findPersonEmail(person.getEmail());
		if (persons!=null){
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

	public Person getPersons() {
		return persons;
	}

	public void setPerson(Person person) {
		this.person = new Person();
		this.person = person;
	}

}
