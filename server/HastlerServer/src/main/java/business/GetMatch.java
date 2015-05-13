package business;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import DBServices.MongoMatchRepository;
import entity.Match;
import repositories.MatchRepository;
import repositories.Repository;

public class GetMatch implements UnitOfWork {

	private MatchRepository matchRepository;
	private Match match;
	private List<Match> matches;
	
	public GetMatch() {
		super();
	}

	@Override
	public boolean run() {
		Match matchR= matchRepository.findOneMatch(match.getId());
		this.matches = new ArrayList<Match>();
		if(matchR!=null){
			matches = Collections.singletonList(matchR);
			return true;
		}else{
			matches = null;
			return false;
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
