package rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Person;
import exeption.PersonNotFoundException;
import DTO.PersonDTO;
import repository.PersonRepository;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class MongoDBPersonService implements PersonService{
	
	private final PersonRepository repository;
	 
    @Autowired
    MongoDBPersonService(PersonRepository repository) {
        this.repository = repository;
    }
 
    @Override
    public PersonDTO create(PersonDTO todo) {
        Person persisted =  new Person(todo.getProfile());
        persisted = repository.save(persisted);
        return convertToDTO(persisted);
    }
 
    @Override
    public PersonDTO delete(String id) throws PersonNotFoundException {
    	Person deleted = findPersonById(id);
        repository.delete(deleted);
        return convertToDTO(deleted);
    }
 
    @Override
    public List<PersonDTO> findAll() {
        List<Person> todoEntries = repository.findAll();
        return convertToDTOs(todoEntries);
    }
 
    private List<PersonDTO> convertToDTOs(List<Person> models) {
        return models.stream()
                .map(this::convertToDTO)
                .collect(toList());
    }
 
    @Override
    public PersonDTO findById(String id) throws PersonNotFoundException {
        Person found = findPersonById(id);
        return convertToDTO(found);
    }
 
    @Override
    public PersonDTO update(PersonDTO todo) throws Exception {
        Person updated = findPersonById(todo.getId());
        updated.update(todo.getProfile());
        updated = repository.save(updated);
        return convertToDTO(updated);
    }
 
    private Person findPersonById(String id) throws PersonNotFoundException {
        Optional<Person> result = repository.findOne(id);
        return result.orElseThrow(() -> new PersonNotFoundException(id));
 
    }
 
    private PersonDTO convertToDTO(Person model) {
    	PersonDTO dto = new PersonDTO();
 
        dto.setId(model.getId());
        dto.setProfile(model.getProfile());
 
        return dto;
    }

}
