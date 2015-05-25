package business;

import java.util.ArrayList;
import java.util.List;

import DBServices.MongoMatchRepository;
import repositories.MatchRepository;
import repositories.Repository;
import entity.Match;

public class GetMatchHastly implements UnitOfWork {

	private MatchRepository matchRepository;
	private Match match;
	private List<Match> matches;
	
	public GetMatchHastly() {
		super();
	}

	@Override
	public boolean run() {
		this.matches = new ArrayList<Match>();
		this.matches= matchRepository.findMatchHastly(match.getHastly());
		if(this.matches.isEmpty()){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		matchRepository = new MongoMatchRepository();
		matchRepository = (MatchRepository) repository;
	}

	public void setMatch(Match match) {
		this.match = new Match();
		this.match = match;
	}

	public List<Match> getMatches() {
		return matches;
	}

}
