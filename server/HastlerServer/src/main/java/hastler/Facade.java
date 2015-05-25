package hastler;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import business.DelService;
import business.DeleteMatch;
import business.EditPerson;
import business.EditService;
import business.EmailCheck;
import business.GetAllService;
import business.GetCategory;
import business.GetMatch;
import business.GetMatchUser;
import business.GetMatchServiId;
import business.GetPerson;
import business.GetPersonEmail;
import business.GetPersonHastly;
import business.GetService;
import business.GetServiceEmail;
import business.GetServiceId;
import business.LogIn;
import business.PostComment;
import business.PostMatch;
import business.PostPerson;
import business.PostService;
import business.SingOn;
import business.UnitOfWork;
import DBServices.MongoMatchRepository;
import DBServices.MongoPersonRepository;
import DBServices.MongoServiRepository;
import DBServices.MongoUserRepository;
import repositories.MatchRepository;
import repositories.PersonRepository;
import repositories.ServiRepository;
import repositories.UserRepository;
import entity.Match;
import entity.Person;
import entity.Servi;
import entity.User;

/**
 * Handles requests for the application home page.
 */
@RestController
public class Facade {
	
	private static final Logger logger = LoggerFactory.getLogger(Facade.class);
	

	PersonRepository personMongo = new MongoPersonRepository();
	ServiRepository serviMongo = new MongoServiRepository();
	UserRepository userMongo = new MongoUserRepository();
	MatchRepository matchMongo = new MongoMatchRepository();
	
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	//lo que tiene que ver con Personas
	
	@RequestMapping(value = "/persona", method = RequestMethod.GET)
	public @ResponseBody List<Person> obtenerPersonas(@RequestParam(value = "name", required=true) String name){
		Person person = new Person();
		person.setName(name);
		System.out.println("obtenerPersonas");
		UnitOfWork getPerson = new GetPerson();
		getPerson.SetRepository(personMongo);
		((GetPerson) getPerson).setPerson(person);
		boolean run = getPerson.run();
		if(run){
			List<Person> persons = ((GetPerson) getPerson).getPersons();
			return persons;
		}else{
			return null;
		}		
	}
	
	@RequestMapping(value = "/personaEmail", method = RequestMethod.GET)
	public @ResponseBody Person obtenerPersonasEmail(@RequestParam(value = "email", required=true) String email){
		Person person = new Person();
		person.setEmail(email);
		System.out.println("obtenerPersonasEmail");
		UnitOfWork getPerson = new GetPersonEmail();
		getPerson.SetRepository(personMongo);
		((GetPersonEmail) getPerson).setPerson(person);
		boolean run = getPerson.run();
		if(run){
			Person personR = ((GetPersonEmail) getPerson).getPersons();
			return personR;
		}else{
			return null;
		}		
	}
	
	@RequestMapping(value = "/personaHastly", method = RequestMethod.GET)
	public @ResponseBody Person obtenerPersonasHastly(@RequestParam(value = "hastly", required=true) String hastly){
		Person person = new Person();
		person.setHastly(hastly);
		System.out.println("obtenerPersonasHastly");
		UnitOfWork getPerson = new GetPersonHastly();
		getPerson.SetRepository(personMongo);
		((GetPersonHastly) getPerson).setPerson(person);
		boolean run = getPerson.run();
		if(run){
			Person personR = ((GetPersonHastly) getPerson).getPersons();
			return personR;
		}else{
			return null;
		}		
	}
	
	@RequestMapping(value = "/persona", method = RequestMethod.POST)
	public @ResponseBody Boolean agregarPersona(@RequestBody Person person){
		System.out.println("agregarPersona");
		UnitOfWork postPerson = new PostPerson();
		postPerson.SetRepository(personMongo);
		((PostPerson)postPerson).setPerson(person);
		boolean result = postPerson.run();
		return result;
	}
	
	@RequestMapping(value = "/editarPersona", method = RequestMethod.POST)
	public @ResponseBody Boolean editarPersona(@RequestBody Person person){
		System.out.println("editarPersona");
		System.out.println("el id es : "+ person.getId());
		UnitOfWork editPerson = new EditPerson();
		editPerson.SetRepository(personMongo);
		((EditPerson)editPerson).setPerson(person);
		boolean result = editPerson.run();
		System.out.println("el resultado es : "+ result);
		return result;
	}
	
	//Lo que tiene que ver con Servicios
	
	@RequestMapping(value = "/servicioAll", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerServiciosAll(){
		System.out.println("obtenerServiciosAll");
		UnitOfWork getAll = new GetAllService();
		getAll.SetRepository(serviMongo);
		getAll.run();
		List<Servi> servis = ((GetAllService) getAll).getPersons();
		return servis;
	}
	
	
	@RequestMapping(value = "/servicio", method = RequestMethod.POST)
	public @ResponseBody boolean guardarServicio(@RequestBody Servi servicio){
		System.out.println("guardarServicio");
		UnitOfWork postServi = new PostService();
		postServi.SetRepository(serviMongo);
		((PostService)postServi).setServicioR(servicio);
		boolean result = postServi.run();
		return result;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerServicios(@RequestParam(value = "name", required=true) String name){
		Servi servicio = new Servi();
		servicio.setServiceName(name);
		System.out.println("obtenerServicios");
		UnitOfWork getServi = new GetService();
		getServi.SetRepository(serviMongo);
		((GetService)getServi).setServi(servicio);
		boolean result = getServi.run();
		if(result){
			List<Servi> servis = ((GetService)getServi).getServices();
			return servis;
		}else{
			return null;
		}
	}
	
	@RequestMapping(value = "/servicioEmail", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerServiciosEmail(@RequestParam(value = "email", required=true) String email){
		Servi servicio = new Servi();
		servicio.setEmail(email);
		System.out.println("obtenerServiciosEmail");
		UnitOfWork getServi = new GetServiceEmail();
		getServi.SetRepository(serviMongo);
		((GetServiceEmail)getServi).setServi(servicio);
		boolean result = getServi.run();
		if(result){
			List<Servi> servis = ((GetServiceEmail)getServi).getServices();
			return servis;
		}else{
			return null;
		}
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.DELETE)
	public @ResponseBody boolean borrarServicio(@RequestParam(value = "Id", required=true) String Id){
		Servi servicio = new Servi();
		servicio.setId(Id);
		System.out.println("borrarServicio");
		UnitOfWork delServi = new DelService();
		delServi.SetRepository(serviMongo);
		((DelService)delServi).setServi(servicio);
		boolean result = delServi.run();
		return result;
	}
	
	@RequestMapping(value = "/servicioId", method = RequestMethod.GET)
	public @ResponseBody Servi obtenerServiciosId(@RequestParam(value = "id", required=true) String id){
		Servi servicio = new Servi();
		servicio.setId(id);
		System.out.println("obtenerServiciosId");
		UnitOfWork getServi = new GetServiceId();
		getServi.SetRepository(serviMongo);
		((GetServiceId)getServi).setServi(servicio);
		boolean result = getServi.run();
		if(result){
			Servi servis = ((GetServiceId)getServi).getServices();
			return servis;
		}else{
			return null;
		}
	}
	
	@RequestMapping(value = "/editarServi", method = RequestMethod.POST)
	public @ResponseBody boolean editarServicio(@RequestBody Servi servicio){
		System.out.println("editarServicio");
		UnitOfWork editServi = new EditService();
		editServi.SetRepository(serviMongo);
		((EditService)editServi).setServi(servicio);
		boolean result = editServi.run();
		System.out.println(result);
		return result;
	}
	
	@RequestMapping(value = "/categoria", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerCategoria(@RequestParam(value = "category", required=true)
		String category){
		System.out.println("obtenerCategoria");
		UnitOfWork getCategory = new GetCategory();
		getCategory.SetRepository(serviMongo);
		((GetCategory)getCategory).setCategory(category);
		boolean result = getCategory.run();
		if(result){
			List<Servi> servis = ((GetCategory)getCategory).getServices();
			return servis;
		}else{
			return null;
		}
	}
	
	@RequestMapping(value = "/comentario", method = RequestMethod.POST)
	public @ResponseBody boolean agregarComentario(@RequestBody Servi servicio){
		System.out.println("agregarComentario");
		UnitOfWork postComment = new PostComment();
		postComment.SetRepository(serviMongo);
		((PostComment)postComment).setComment(servicio);
		boolean result = postComment.run();
		return result;
	}
	
	//lo que tiene que ver con match
	
	@RequestMapping(value = "/match", method = RequestMethod.POST)
	public @ResponseBody boolean agregarMatch(@RequestBody Match match){
		System.out.println("agregarMatch");
		UnitOfWork postMatch = new PostMatch();
		postMatch.SetRepository(matchMongo);
		((PostMatch)postMatch).setMatch(match);
		boolean result = postMatch.run();
		return result;
	}
	
	@RequestMapping(value = "/match", method = RequestMethod.GET)
	public @ResponseBody List<Match> obtenerMatch(@RequestParam(value = "Id", required=true) String Id){
		Match match = new Match();
		match.setId(Id);
		System.out.println("obtenerMatch");
		UnitOfWork getMatch = new GetMatch();
		getMatch.SetRepository(matchMongo);
		((GetMatch)getMatch).setMatch(match);
		boolean result = getMatch.run();
		if(result){
			List<Match> matchs = ((GetMatch)getMatch).getMatches();
			return matchs;
		}else{
			return null;
		}
	}
	
	@RequestMapping(value = "/match", method = RequestMethod.DELETE)
	public @ResponseBody boolean eliminarMatch(@RequestParam(value = "id", required=true) String id){
		Match match = new Match();
		match.setId(id);
		System.out.println("eliminarMatch");
		UnitOfWork delMatch = new DeleteMatch();
		delMatch.SetRepository(matchMongo);
		((DeleteMatch)delMatch).setMatch(match);
		boolean result = delMatch.run();
		return result;
	}
	
	@RequestMapping(value = "/matchServi", method = RequestMethod.GET)
	public @ResponseBody List<Match> obtenerMatchServiId(@RequestParam(value = "serviId", required=true) 
		String serviId){
		Match match = new Match();
		match.setServiId(serviId);
		System.out.println("obtenerMatchServiId");
		UnitOfWork getMatch = new GetMatchServiId();
		getMatch.SetRepository(matchMongo);
		((GetMatchServiId)getMatch).setMatch(match);
		boolean result = getMatch.run();
		if(result){
			List<Match> matchs = ((GetMatchServiId)getMatch).getMatches();
			return matchs;
		}else{
			return null;
		}
	}
	
	@RequestMapping(value = "/matchUser", method = RequestMethod.GET)
	public @ResponseBody List<Match> obtenerMatchUser(@RequestParam(value = "email", required=true) 
				String email){
		Match match = new Match();
		match.setEmailUser(email);
		System.out.println("obtenerMatchEmail");
		UnitOfWork getMatch = new GetMatchUser();
		getMatch.SetRepository(matchMongo);
		((GetMatchUser)getMatch).setMatch(match);
		boolean result = getMatch.run();
		if(result){
			List<Match> matchs = ((GetMatchUser)getMatch).getMatches();
			return matchs;
		}else{
			return null;
		}
	}
	
	//lo que tiene que ver con User
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	@ResponseBody
	public boolean login(@RequestParam(value = "email", required=false) String email,
			@RequestParam(value = "username", required=false) String username,
			@RequestParam(value = "password", required=true) String password){
		User user = new User();
		user.setEmail(email);
		user.setPassword(password);
		user.setUsername(username);
		System.out.println("login");
		UnitOfWork login = new LogIn();
		login.SetRepository(userMongo);
		((LogIn)login).setUser(user);
		boolean result = login.run();
		// esto es boolean respuesta = userMongo.findOneUser(user);
		return result;
	}
	
	@RequestMapping(value = "/emailCheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean login(@RequestParam(value = "email", required=false) String email){
		User user = new User();
		user.setEmail(email);
		System.out.println("login");
		UnitOfWork emailCheck = new EmailCheck();
		emailCheck.SetRepository(userMongo);
		((EmailCheck)emailCheck).setUser(user);
		boolean result = emailCheck.run();
		// esto es boolean respuesta = userMongo.findOneUser(user);
		return result;
	}
	
	@RequestMapping(value = "/singon", method = RequestMethod.POST)
	public @ResponseBody boolean singon(@RequestBody User user){
		System.out.println("singon");
		System.out.println(user.getEmail());
		System.out.println(user.getPassword());
		UnitOfWork singin = new SingOn();
		singin.SetRepository(userMongo);
		((SingOn)singin).setUser(user);
		boolean result = singin.run();
		return result;
	}
	
	/*	Ejemplos
	@RequestMapping(value = "/hola", method = RequestMethod.POST)
	public @ResponseBody Servi mostrarHola(@RequestBody Test jsonString){
		Servi servicioR = new Servi();
		System.out.println("yei el use es: "+jsonString.getServiceName());
		return servicioR;
	}	
	
	
	 * @RequestMapping(value = "/persona", method = RequestMethod.GET)
	public @ResponseBody Person ObtenerPersona(@RequestParam String name){
		//logica para obtener datos
		String nombre = "Nombre";
		int ident = 1;
		if(name!=null)nombre=name;
		if(id!=null)ident=Integer.parseInt(id);
		Person p = new Person();
		p.setNombre(nombre);
		p.setId(ident);
		return p;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.GET)
	public @ResponseBody ArrayList<Servi> ObtenerServicio(@RequestParam(value="name", required=true)String name){
		//logica para obtener datos
		ArrayList<Servicio> servicios = new ArrayList<Servicio>();
		Servicio serv = new Servicio();
		Persona p = new Persona();
		p.setNombre(name);
		serv.setDue�o(p);
		serv.setNombre("Clases de piano");
		servicios.add(serv);
		serv.setNombre("Clases de cocina");
		servicios.add(serv);
		return servicios;
	}*/
	
}
