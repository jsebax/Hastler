package business;

import java.util.UUID;

import DBServices.MongoMatchRepository;
import entity.Match;
import repositories.MatchRepository;
import repositories.Repository;

public class PostMatch implements UnitOfWork {

	private MatchRepository matchRepository;
	private Match match;
	
	public PostMatch() {
		super();
	}

	@Override
	public boolean run() {
		match.setId(UUID.randomUUID().toString());
		Match matchR = matchRepository.saveMatch(match);
		if(matchR.equals(match)){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public void SetRepository(Repository repository) {
		matchRepository	= new MongoMatchRepository();
		matchRepository = (MatchRepository) repository;
	}

	public void setMatch(Match match) {
		this.match = new Match();
		this.match = match;
	}

}
