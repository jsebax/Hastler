package business;

import java.util.List;

import repositories.MatchRepository;
import repositories.Repository;
import entity.Match;

public class GetMatchServiId implements UnitOfWork {

	MatchRepository matchRepository;
	Match match;
	List<Match> matches;
	
	public GetMatchServiId() {
		super();
	}

	@Override
	public boolean run() {
		List<Match> matchR= matchRepository.findMatchServi(match.getServiId());
		if(matchR.isEmpty()){
			return false;
		}else{
			return true;
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
