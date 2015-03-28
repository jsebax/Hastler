package com.eafit.hastler;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
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
	public @ResponseBody Persona ObtenerPersona(@RequestParam(value="name", required=false)String name,@RequestParam(value="id", required=false)String id){
		//logica para obtener datos
		String nombre = "Nombre";
		int ident = 1;
		if(name!=null)nombre=name;
		if(id!=null)ident=Integer.parseInt(id);
		Persona p = new Persona();
		p.setNombre(nombre);
		p.setId(ident);
		return p;
	}
	
	@RequestMapping(value = "/servicio", method = RequestMethod.GET)
	public @ResponseBody ArrayList<Servicio> ObtenerServicio(@RequestParam(value="name", required=true)String name){
		//logica para obtener datos
		ArrayList servicios = new ArrayList<Servicio>();
		Servicio serv = new Servicio();
		Persona p = new Persona();
		p.setNombre(name);
		serv.setDue�o(p);
		serv.setNombre("Clases de piano");
		servicios.add(serv);
		serv.setNombre("Clases de cocina");
		servicios.add(serv);
		return servicios;
	}
	
}