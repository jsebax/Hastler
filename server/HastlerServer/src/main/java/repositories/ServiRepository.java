package repositories;

import java.util.List;
import java.util.Optional;

import entity.Servi;

public interface ServiRepository extends Repository {
	 void deleteServi(Servi deleted);
	 
	    List<Servi> findAllServi();
	 
	    Optional<Servi> findOneServi(String id);
	    
	    List<Servi> findCategory(String category);
	 
	    Servi saveServi(Servi saved);
	    
	    Servi updateServi(String id, String toUp, Object update);

		List<Servi> findServi(String serviceName);
}
