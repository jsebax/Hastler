package rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Person;
import entity.Profile;
import entity.Servi;
import exeption.ServiceNotFoundException;
import DTO.ServiDTO;
import repository.ServiRepository;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class MongoDBServiService implements ServiService {
	
	private final ServiRepository repository;
	 
    @Autowired
    MongoDBServiService(ServiRepository repository) {
        this.repository = repository;
    }
 
    @Override
    public ServiDTO create(ServiDTO todo) {
        Servi persisted = new Servi(todo.getTitle(),
        		todo.getDescription(),
        		new Person(new Profile(todo.getOwner())));
        persisted = repository.save(persisted);
        return convertToDTO(persisted);
    }
 
    @Override
    public ServiDTO delete(String id) throws ServiceNotFoundException {
    	Servi deleted = findServiById(id);
        repository.delete(deleted);
        return convertToDTO(deleted);
    }
 
    @Override
    public List<ServiDTO> findAll() {
        List<Servi> todoEntries = repository.findAll();
        return convertToDTOs(todoEntries);
    }
 
    private List<ServiDTO> convertToDTOs(List<Servi> models) {
        return models.stream()
                .map(this::convertToDTO)
                .collect(toList());
    }
 
    @Override
    public ServiDTO findById(String id) throws ServiceNotFoundException {
        Servi found = findServiById(id);
        return convertToDTO(found);
    }
 
    @Override
    public ServiDTO update(ServiDTO todo) throws Exception {
        Servi updated = findServiById(todo.getId());
        updated.update(todo.getTitle(), todo.getDescription(),
        		new Person(new Profile(todo.getOwner())));
        updated = repository.save(updated);
        return convertToDTO(updated);
    }
 
    private Servi findServiById(String id) throws ServiceNotFoundException {
        Optional<Servi> result = repository.findOne(id);
        return result.orElseThrow(() -> new ServiceNotFoundException(id));
 
    }
 
    private ServiDTO convertToDTO(Servi model) {
    	ServiDTO dto = new ServiDTO();
 
        dto.setId(model.getId());
        dto.setTitle(model.getTitle());
        dto.setDescription(model.getDescription());
 
        return dto;
    }
}
