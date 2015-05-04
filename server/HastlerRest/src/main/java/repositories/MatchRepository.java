package repositories;

import java.util.List;
import java.util.Optional;

import entity.Match;

public interface MatchRepository extends Repository{
	void deleteMatch(Match deleted);
	 
    List<Match> findAllMatch();
 
    Optional<Match> findOneMatch(String id);
 
    Match saveMatch(Match saved);
    
    Match updateMatch(String id, String toUp, Object update);
}
