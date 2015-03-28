package repository;

import org.springframework.data.repository.Repository;

import entity.Servi;
import java.util.List;
import java.util.Optional;

public interface ServiRepository extends Repository<Servi, String> {
	void delete(Servi deleted);
	 
    List<Servi> findAll();
 
    Optional<Servi> findOne(String id);
 
    Servi save(Servi saved);
}
