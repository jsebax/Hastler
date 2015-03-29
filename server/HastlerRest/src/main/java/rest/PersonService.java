package rest;

import java.util.List;

import DTO.PersonDTO;

public interface PersonService {
	
	PersonDTO create(PersonDTO todo);
	 
	PersonDTO delete(String id)throws Exception;
 
    List<PersonDTO> findAll();
 
    PersonDTO findById(String id)throws Exception;
 
    PersonDTO update(PersonDTO todo)throws Exception;
}
