package repositories;

import java.util.List;

import entity.Match;

public interface MatchRepository extends Repository{
	void deleteMatch(Match deleted);
	 
    List<Match> findAllMatch();
 
    Match findOneMatch(String id);
 
    Match saveMatch(Match saved);
    
    Match updateMatch(String id, String toUp, Object update);

	List<Match> findMatchServi(String id);
	
	List<Match> findMatchHastly(String id);
}

