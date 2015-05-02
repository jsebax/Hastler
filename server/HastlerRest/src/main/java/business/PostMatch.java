package business;

import entity.Match;
import repositories.MatchRepository;
import repositories.Repository;

public class PostMatch implements UnitOfWork {

	MatchRepository matchRepository;
	Match match;
	
	public PostMatch() {
		super();
	}

	@Override
	public boolean run() {
		Match matchR = matchRepository.saveMatch(match);
		if(matchR.equals(match)){
			return true;
		}else{
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

}
