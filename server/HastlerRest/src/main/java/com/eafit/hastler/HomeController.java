package com.eafit.hastler;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import DBservice.MongoDBService;
import entity.Person;
import entity.Servi;
import entity.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	MongoDBService mongo = new MongoDBService();
	
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
	
	@RequestMapping(value = "/persona", method = RequestMethod.GET)
	public @ResponseBody List<Person> ObtenerPersonas(){
		List<Person> persons = mongo.findAllPerson();
		return persons;
	}
	
	@RequestMapping(value = "/persona", method = RequestMethod.POST)
	public @ResponseBody Person GuardarPersona(@RequestParam Person person){
		Person personR = mongo.savePerson(person);
		return personR;
	}
	
	
	@RequestMapping(value = "/servicio", method = RequestMethod.GET)
	public @ResponseBody List<Servi> ObtenerServicio(){
		List<Servi> persons = mongo.findAllServi();
		return persons;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.POST)
	public @ResponseBody Servi GuardarServicio(@RequestParam Servi servicio){
		Servi servicioR = mongo.saveServi(servicio);
		return servicioR;
	}	
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public @ResponseBody boolean Login(@RequestParam User user){
		boolean respuesta = mongo.findOneUser(user);
		return respuesta;
	}
	
	/*	Ejemplos
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
