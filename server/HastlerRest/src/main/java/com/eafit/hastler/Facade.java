package com.eafit.hastler;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import business.DelService;
import business.EditPerson;
import business.EditService;
import business.GetAllService;
import business.GetCategory;
import business.GetMatch;
import business.GetPerson;
import business.GetService;
import business.LogIn;
import business.PostComment;
import business.PostMatch;
import business.PostPerson;
import business.PostService;
import business.SingIn;
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
@Controller
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
	public @ResponseBody List<Person> obtenerPersonas(@RequestBody Person person){
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
	
	@RequestMapping(value = "/persona", method = RequestMethod.POST)
	public @ResponseBody Boolean agregarPersona(@RequestBody Person person){
		UnitOfWork postPerson = new PostPerson();
		boolean result = true;
		return result;
	}
	
	@RequestMapping(value = "/editarPersona", method = RequestMethod.POST)
	public @ResponseBody Boolean editPersona(@RequestBody Person person){
		UnitOfWork editPerson = new EditPerson();
		boolean result = true;
		return result;
	}
	
	//Lo que tiene que ver con Servicios
	
	@RequestMapping(value = "/servicioAll", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerServiciosAll(){
		UnitOfWork getAll = new GetAllService();
		getAll.SetRepository(serviMongo);
		getAll.run();
		List<Servi> servis = ((GetAllService) getAll).getPersons();
		return servis;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.POST)
	public @ResponseBody boolean guardarServicio(@RequestBody Servi servicio){
		UnitOfWork postServi = new PostService();
		postServi.SetRepository(serviMongo);
		((PostService)postServi).setServicioR(servicio);
		boolean result = postServi.run();
		return result;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerServicios(@RequestBody Servi servicio){
		UnitOfWork getServi = new GetService();
		List<Servi> servis = null;
		return servis;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.DELETE)
	public @ResponseBody boolean borrarServicios(@RequestBody Servi servicio){
		UnitOfWork delServi = new DelService();
		boolean result = true;
		return result;
	}
	
	@RequestMapping(value = "/editarServi", method = RequestMethod.POST)
	public @ResponseBody boolean editarServicio(@RequestBody Servi servicio){
		UnitOfWork editServi = new EditService();
		
		boolean result = true;
		return result;
	}
	
	@RequestMapping(value = "/categoria", method = RequestMethod.GET)
	public @ResponseBody List<Servi> obtenerCategoria(@RequestBody Servi servicio){
		UnitOfWork getCategory = new GetCategory();
		List<Servi> servis = null;
		return servis;
	}
	
	@RequestMapping(value = "/comentario", method = RequestMethod.POST)
	public @ResponseBody boolean agregarComentario(@RequestBody Servi servicio){
		UnitOfWork postComment = new PostComment();
		boolean result = true;
		return result;
	}
	
	
	//lo que tiene que ver con match
	
	@RequestMapping(value = "/match", method = RequestMethod.POST)
	public @ResponseBody boolean agregarMatch(@RequestBody Match match){
		UnitOfWork postMatch = new PostMatch();
		boolean result = true;
		return result;
	}
	
	@RequestMapping(value = "/match", method = RequestMethod.GET)
	public @ResponseBody Match obtenerMatch(@RequestBody Match match){
		UnitOfWork getMatch = new GetMatch();
		Match matchs = null;
		return matchs;
	}
	
	//lo que tiene que ver con User
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public @ResponseBody boolean login(@RequestBody User user){
		UnitOfWork login = new LogIn();
		boolean result = true;
		// esto es boolean respuesta = userMongo.findOneUser(user);
		return result;
	}
	
	@RequestMapping(value = "/singin", method = RequestMethod.POST)
	public @ResponseBody boolean singin(@RequestBody User user){
		UnitOfWork singin = new SingIn();
		boolean result = true;
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
