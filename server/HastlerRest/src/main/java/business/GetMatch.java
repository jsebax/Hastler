package business;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import entity.Match;
import repositories.MatchRepository;
import repositories.Repository;

public class GetMatch implements UnitOfWork {

	MatchRepository matchRepository;
	Match match;
	List<Match> matches;
	
	public GetMatch() {
		super();
	}

	@Override
	public boolean run() {
		Optional<Match> matchR= matchRepository.findOneMatch(match.getId());
		if(matchR.isPresent()){
			matches = Collections.singletonList(matchR.get());
			return true;
		}else{
			matches = null;
			return false;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		matchRepository = (MatchRepository) repository;
	}

	public void setMatch(Match match) {
		this.match = match;
	}

	public List<Match> getMatches() {
		return matches;
	}

}
